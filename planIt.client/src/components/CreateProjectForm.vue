<template>
  <div>
    <form @submit.prevent="createProject">
      <div class="d-flex flex-column">
        <label class="mt-2" for="name">Name</label>
        <input
          class="my-2"
          type="text"
          placeholder="Name..."
          aria-labelledby="name"
          v-model="newData.name"
        />
        <label class="mt-2" for="description">Description</label>
        <textarea
          class="my-2"
          name="description"
          placeholder="Type a description...."
          v-model="newData.description"
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
import { ref } from '@vue/reactivity';
import { projectsService } from '../services/ProjectsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { useRouter } from 'vue-router';
import { Modal } from 'bootstrap';
export default {
  setup() {
      const newData = ref({});
      const router = useRouter();
    return {
        newData,
        async createProject()
        {
            try
            {
                const newId = await projectsService.createProject(newData.value);
                Modal.getOrCreateInstance(document.getElementById("create-project-modal")).hide();
                router.push({name: "Project", params: { id: newId }});
            }
            catch(error)
            {
                logger.error("[Create Project Form > createProject()]", error.message);
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