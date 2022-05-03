<template>
  <div class="component">
    <div class="d-flex">
      <i
        class="mdi"
        :class="{
          'mdi-checkbox-outline': task.isCompleted,
          'mdi-checkbox-blank-outline': !task.isCompleted,
        }"
      ></i>
      <p>{{ task.name }}</p>
      <i class="mdi mdi-delete"></i>
    </div>
  </div>
  <Modal id="create-task-modal">
    <template #modal-header-slot></template>
    <template #modal-body-slot> </template>
  </Modal>
</template>


<script>
export default {
  props: {
    task: {
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
</style>