<template>
  <div class="position-relative flex-grow-1">
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
      <div v-if="!(sprints.length > 0)">
        <h2>No sprints!</h2>
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
      <h4>Projects</h4>
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
import { computed } from '@vue/reactivity'
import Sprint from '../components/Sprint.vue'
import { AppState } from '../AppState'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, watchEffect } from '@vue/runtime-core'
import { sprintsService } from '../services/SprintsService.js'
import { logger } from '../utils/Logger'
import { projectsService } from '../services/ProjectsService'
import { tasksService } from '../services/TasksService.js';
import { notesService } from '../services/NotesService.js';
import Pop from '../utils/Pop.js'
import { Offcanvas } from 'bootstrap'
export default {
  components: { Sprint },
  watch: {
    async 'route.params.id'(newRoute) {
      projectsService.clearActive();
      sprintsService.clearActive();
      tasksService.clearActive();
      notesService.clearActive();
      Offcanvas.getOrCreateInstance(document.getElementById('projects-offcanvas')).hide()
      await projectsService.getByProjectId(newRoute)
      await sprintsService.getByProjectId(newRoute)
      await tasksService.getByProjectId(newRoute)
      await notesService.getByProjectId(newRoute)
    }
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    onMounted(async () => {
      projectsService.clearActive();
      sprintsService.clearActive();
      tasksService.clearActive();
      notesService.clearActive();
      await projectsService.getByProjectId(route.params.id)
      await sprintsService.getByProjectId(route.params.id)
      await tasksService.getByProjectId(route.params.id)
      await notesService.getByProjectId(route.params.id)
    })

    return {
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
</style>