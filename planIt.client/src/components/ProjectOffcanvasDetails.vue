<template>
  <div class="d-flex justify-content-between" @click="changeProject">
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