<template>
  <div class="row mb-4 selectable" @click="openProject">
    <div class="col-4">
      <h4>{{ project.name }}</h4>
    </div>
    <div class="col-4">
      <img
        :src="project.creator.picture"
        class="member-img"
        alt="profile picture"
      />
    </div>
    <div class="col-4">{{ project.createdAt.substring(0, 10) }}</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default
  {
    props:
    {
      project:
      {
        type: Object,
        required: true
      }
    },

    setup() {
        const router = useRouter();
      return {
          openProject()
          {
              router.push({name: 'Project', params: { id: project.id }})
          }
      }
    }
  }
</script>

<style lang="scss" scoped>
.member-img {
  border-radius: 50%;
  max-height: 120px;
}
</style>