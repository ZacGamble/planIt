<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6"></div>
      <div class="col-md-6"></div>
    </div>
    <Sprint v-for="s in sprints" :key="s.id" :sprint="s" />
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import Sprint from '../components/Sprint.vue'
import { AppState } from '../AppState'
export default {
  components: { Sprint },
  setup() {
    return {
      sprints: computed(() => AppState.sprints)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>