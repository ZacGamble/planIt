<template>
  <div v-if="!user.isAuthenticated">
    <h4>Login to continue</h4>
    <Login />
  </div>
  <div v-else class="boundary flex-grow-1 fade-in">
    <div
      class="
        container
        home-card
        p-5
        bg-white
        rounded
        elevation-3
        projects-container
      "
    >
      <div class="row">
        <div class="col-md-10">
          <h3 class="text-primary-gradient d-inline no-select">Projects</h3>
          <p class="fs-4 no-select">
            A list of all the projects for {{ account.name }}
          </p>
        </div>
        <div class="col-md-2">
          <button
            class="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#create-project-modal"
            title="create project"
          >
            Create Project
          </button>
        </div>
      </div>
      <div v-if="!(projects.length > 0)">
        <h1>Projects will appear here</h1>
      </div>
      <div v-else class="row mt-5 text-primary-gradient">
        <div class="col-md-4">
          <h5 class="no-select">NAME</h5>
        </div>
        <div class="col-md-4">
          <h5 class="no-select">MEMBERS</h5>
        </div>
        <div class="col-md-4">
          <h5 class="no-select">STARTED</h5>
        </div>
      </div>
      <hr />
      <ProjectOverview v-for="p in projects" :key="p.id" :project="p" />
      <!-- COMPONENT HERE -->
    </div>
  </div>
  <Modal id="create-project-modal">
    <template #modal-header-slot>Create Project</template>
    <template #modal-body-slot><CreateProjectForm /></template>
  </Modal>
</template>

<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import Modal from '../components/Modal.vue'
import { AppState } from '../AppState.js';
import { projectsService } from '../services/ProjectsService.js'
export default {
  components: { Modal },
  name: 'Home',

  setup() {

    const user = computed(() => AppState.user);
    // onMounted(() => {
    //   if (user.value.isAuthenticated) {
    //     projectsService.getProjects();
    //   }
    // })

    return {
      projects: computed(() => AppState.projects),
      account: computed(() => AppState.account),
      user
    }
  }
}
</script>

<style scoped lang="scss">
.boundary {
  padding: 5em;
}
.projects-container {
  filter: drop-shadow(1em 0.8em 10px rgb(53, 49, 49));
  flex-grow: 1;
}
.img-clamp {
  height: 5em;
  width: 5em;
  border-radius: 50%;
  object-fit: cover;
}
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
