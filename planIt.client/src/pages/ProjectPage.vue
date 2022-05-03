<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="d-flex flex-column">
          <div class="d-flex p-2 m-2">
            <h1>
              {{ project?.name }}
            </h1>
            <button class="btn btn-outline-danger mx-4">Delete</button>
          </div>
          <h5>
            {{ project?.description }}
          </h5>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="d-flex justify-content-between">
          <div class="div">
            <h5>Sprints</h5>
            <p>
              Group your tasks into sprints for overarching collections for
              better orgainization.
            </p>
          </div>
          <button class="btn btn-outline-primary">Add Sprint</button>
        </div>
      </div>
    </div>
    <Sprint v-for="s in sprints" :key="s.id" :sprint="s" />
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import Sprint from '../components/Sprint.vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
import { sprintsService } from '../services/SprintsService.js'
import { logger } from '../utils/Logger'
import { projectsService } from '../services/ProjectsService'
import { tasksService } from '../services/TasksService.js';
import { notesService } from '../services/NotesService.js';
export default {
  components: { Sprint },

  setup() {

    const user = computed(() => AppState.user);
    const route = useRoute()
    onMounted(async () => {
      logger.log(user)
      if (user.value.isAuthenticated) {
        logger.log('mounted?')
        await projectsService.getProjects();
        await projectsService.getByProjectId(route.params.id)
        await sprintsService.getByProjectId(route.params.id)
        await tasksService.getByProjectId(route.params.id)
        await notesService.getByProjectId(route.params.id)
      }
    })

    return {
      sprints: computed(() => AppState.sprints),
      project: computed(() => AppState.activeProject)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>