<template>
  <div>
    <form @submit.prevent="something">
      <div class="d-flex flex-column">
        <label class="mt-2" for="name">Name</label>
        <input
          class="my-2"
          type="text"
          placeholder="Name..."
          aria-labelledby="name"
        />
        <label class="mt-2" for="description">Description</label>
        <textarea
          class="my-2"
          name="description"
          placeholder="Type a description...."
        ></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
    </form>
  </div>
</template>


<script>
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
textarea {
  resize: none;
}
</style>