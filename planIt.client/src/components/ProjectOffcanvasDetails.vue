<template>
  <div
    class="d-flex justify-content-between selectable no-select"
    aria-label="navigate to project"
    :title="'navigate to ' + project.name + ' project'"
    @click="changeProject"
  >
    <p>{{ project.name }}</p>
    <p>{{ project.createdAt.substring(0, 10) }}</p>
  </div>
</template>


<script>
import { useRouter } from 'vue-router'
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const router = useRouter()
    return {
      changeProject() {
        router.push({ name: 'Project', params: { id: props.project.id } })
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>