<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        Title of Project, delete button, then description
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">Add Sprint button</div>
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
        await sprintsService.getByProjectId(route.params.id)
        await tasksService.getByProjectId(route.params.id)
        await notesService.getByProjectId(route.params.id)
      }
    })

    return {
      sprints: computed(() => AppState.sprints)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>