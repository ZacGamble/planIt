<template>
  <div
    class="border border-primary border-2 rounded p-2 d-flex flex-column mb-3"
  >
    <div class="d-flex align-items-center text-primary">
      <img
        :src="note.creator.picture"
        alt="owners picture"
        class="rounded-circle img-clamp"
      />
      <p class="my-0 ms-2">{{ note.creator.name }}</p>
    </div>
    <p class="p-1 my-0">{{ note.body }}</p>
  </div>
</template>


<script>
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },

  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.img-clamp {
  max-height: 2.5em;
}
</style>