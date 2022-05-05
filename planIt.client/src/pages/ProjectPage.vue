<template>
    <Loading class="flex-grow-1" v-if="loading.length > 0" />
  <div v-else class="position-relative flex-grow-1 fade-in">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="d-flex flex-column px-3">
            <div class="d-flex p-2 m-2">
              <div
                class="d-flex flex-column position-absolute offcanvas-trigger"
              >
                <p
                  data-bs-toggle="offcanvas"
                  data-bs-target="#projects-offcanvas"
                  class="bg-primary px-4 py-2 fw-bold fs-4 selectable"
                >
                  P
                </p>
                <div
                  class="text-primary bg-secondary py-3 selectable"
                  data-bs-toggle="modal"
                  data-bs-target="#account-modal"
                >
                  <i class="mdi mdi-cog px-4 py-2"></i>
                </div>
              </div>
              <h1>
                {{ project?.name }}
              </h1>
              <button
                class="btn btn-outline-danger mx-4"
                @click="deleteProject"
              >
                Delete
              </button>
            </div>
            <h5>
              {{ project?.description }}
            </h5>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="d-flex justify-content-between px-3">
            <div class="div">
              <h5 class="text-primary">Sprints</h5>
              <p>
                Group your tasks into sprints for overarching collections for
                better orgainization.
              </p>
            </div>
            <button
              class="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#create-sprint-modal"
            >
              Add Sprint
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="!(sprints.length > 0)"
        class="text-center mt-5 border text-dark"
      >
        <h1 class="fw-bold">No sprints!</h1>
        <i class="mdi mdi-file-question-outline no-sprints-icon"></i>
      </div>
      <Sprint v-for="s in sprints" :key="s.id" :sprint="s" />
    </div>
  </div>
  <Modal id="create-sprint-modal">
    <template #modal-header-slot>
      <h2>Create Sprint</h2>
    </template>
    <template #modal-body-slot>
      <CreateSprintForm />
    </template>
  </Modal>
  <OffCanvas class="offcanvas-start" id="projects-offcanvas">
    <template #offcanvas-header-slot>
      <h4>Projects<i class="mdi mdi-folder-heart fs-2 ms-4"></i></h4>
      <h6>for {{ account.name }}</h6>
    </template>
    <template #offcanvas-body-slot>
      <div class="flex-column d-flex">
        <div class="d-flex justify-content-between">
          <h6>NAME</h6>
          <h6>STARTED</h6>
        </div>
        <!-- Project offcanvas component here -->
        <ProjectOffcanvasDetails
          v-for="p in projects"
          :key="p.id"
          :project="p"
        />
      </div>
    </template>
  </OffCanvas>
  <Modal id="account-modal">
    <template #modal-header-slot>
      <h4>Edit Account</h4>
    </template>
    <template #modal-body-slot>
      <EditAccountForm />
    </template>
  </Modal>
</template>



<script>
import { computed, ref } from '@vue/reactivity'
import Sprint from '../components/Sprint.vue'
import { AppState } from '../AppState'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, watch, watchEffect } from '@vue/runtime-core'
import { sprintsService } from '../services/SprintsService.js'
import { logger } from '../utils/Logger'
import { projectsService } from '../services/ProjectsService'
import { tasksService } from '../services/TasksService.js';
import { notesService } from '../services/NotesService.js';
import Pop from '../utils/Pop.js'
import { Offcanvas } from 'bootstrap'
export default {
  components: { Sprint },

  setup() {
    const route = useRoute()
    const router = useRouter()
    const loading = ref([]);
    const routeId = computed(() => route.params.id);

    const componentLoaded = () => {
        loading.value.pop();
    }

    const finishedLoading = () =>
    {
        const loadPromise = new Promise((resolve, reject) => {

            while(loading.loading > 0) { /* intentionally empty */};
            resolve();
        });
        return loadPromise;
    }

    watch(routeId, async (newRoute) => {
      if(newRoute)
      {
        loading.value = [1, 1, 1, 1];
        projectsService.clearActive();
        sprintsService.clearActive();
        tasksService.clearActive();
        notesService.clearActive();
        Offcanvas.getOrCreateInstance(document.getElementById('projects-offcanvas')).hide()
        projectsService.getByProjectId(newRoute).then(componentLoaded);
        sprintsService.getByProjectId(newRoute).then(componentLoaded);
        tasksService.getByProjectId(newRoute).then(componentLoaded);
        notesService.getByProjectId(newRoute).then(componentLoaded);
        await finishedLoading();
      }
    })

    onMounted(async () => {
        loading.value = [1, 1, 1, 1];
        projectsService.clearActive();
        sprintsService.clearActive();
        tasksService.clearActive();
        notesService.clearActive();
        projectsService.getByProjectId(route.params.id).then(componentLoaded);
        sprintsService.getByProjectId(route.params.id).then(componentLoaded);
        tasksService.getByProjectId(route.params.id).then(componentLoaded);
        notesService.getByProjectId(route.params.id).then(componentLoaded);
        await finishedLoading();
    })

    return {
        loading,
      sprints: computed(() => AppState.sprints),
      project: computed(() => AppState.activeProject),
      projects: computed(() => AppState.projects),
      account: computed(() => AppState.account),
      route,

      async deleteProject() {
        try {
          if (await Pop.confirm()) {
            await projectsService.deleteProject(route.params.id);
            Pop.toast("Project deleted", "success")
            router.push({ name: "Home" });
          }
        }
        catch (error) {
          logger.error(error.message);
          Pop.toast(error.message, "error");
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.offcanvas-trigger {
  left: 0px;
  top: 10px;
}
.no-sprints-icon {
  font-size: 10em;
  color: rgb(109, 97, 97);
}
</style>