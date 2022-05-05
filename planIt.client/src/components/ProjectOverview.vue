<template>
  <div
    class="row mb-4 selectable align-items-center border-bottom py-2 no-select"
    @click="openProject()"
    :title="'open ' + project.name"
  >
    <div class="col-4">
      <h4>{{ project.name }}</h4>
    </div>
    <div class="col-4">
      <img
        :src="project.creator.picture"
        class="img-clamp"
        alt="profile picture"
      />
    </div>
    <div class="col-4 fw-bold">{{ project.createdAt.substring(0, 10) }}</div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core';
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

    setup(props) {
      const router = useRouter();
      return {
        openProject() {
          router.push({ name: 'Project', params: { id: props.project.id } })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.img-clamp {
  height: 5em;
  width: 5em;
  border-radius: 50%;
  object-fit: cover;
}
</style>