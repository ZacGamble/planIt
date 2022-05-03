<template>
  <div class="component">
    <div>
      <form @submit.prevent="createTask">
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
          <input
            type="number"
            min="0"
            placeholder="0"
            v-model="newData.weight"
            required
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="submit" class="btn btn-primary">Save changes</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import { ref } from '@vue/reactivity';
import { tasksService } from '../services/TasksService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { Modal } from 'bootstrap';
import { useRoute } from 'vue-router';
export default {
  props: {
    sprintId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const newData = ref({});
    const route = useRoute();
    return {
      newData,
      async createTask() {
        try {
          newData.value.projectId = route.params.id;
          newData.value.sprintId = props.sprintId
          Modal.getOrCreateInstance(document.getElementById("create-task-modal" + props.sprintId)).hide();
          const newId = await tasksService.createTask(newData.value);
          Pop.toast("New Task created", "success");
          newData.value = {};
        }
        catch (error) {
          logger.error("[Create task Form > createtask()]", error.message);
          Pop.toast(error.message, "error");
        }
      }
    }
  }
}
</script>



<style lang="scss" scoped>
</style>