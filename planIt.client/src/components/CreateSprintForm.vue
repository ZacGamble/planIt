<template>
  <div>
    <form @submit.prevent="createSprint">
      <div class="d-flex flex-column">
        <label class="mt-2" for="name">Name</label>
        <input
          class="my-2"
          type="text"
          placeholder="Name..."
          aria-labelledby="name"
          v-model="newData.name"
          required
        />
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
import { ref } from '@vue/reactivity';
import { sprintsService } from '../services/SprintsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { Modal } from 'bootstrap';
import { useRoute } from 'vue-router';
export default {
  setup() {
      const newData = ref({});
      const route = useRoute();
    return {
        newData,
        async createSprint()
        {
            try
            {
                newData.value.projectId = route.params.id;
                Modal.getOrCreateInstance(document.getElementById("create-sprint-modal")).hide();
                const newId = await sprintsService.createSprint(newData.value);
                Pop.toast("New Sprint created", "success")
                newData.value = {};
            }
            catch(error)
            {
                logger.error("[Create Sprint Form > createSprint()]", error.message);
                Pop.toast(error.message, "error");
            }
        }
    }
  }
}
</script>


<style lang="scss" scoped>
textarea {
  resize: none;
}
</style>