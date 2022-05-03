<template>
  <div class="component">
    <div class="d-flex">
      <i
        class="action pe-2 mdi"
        :class="{
          'mdi-checkbox-outline': task.isComplete,
          'mdi-checkbox-blank-outline': !task.isComplete,
        }"
        @click="toggleTask"
      ></i>
      <p class="my-0 px-2">{{ task.name }}</p>
      <i class="ps-2 action mdi mdi-delete" @click="deleteTask"></i>
    </div>
  </div>
  <Modal id="create-task-modal">
    <template #modal-header-slot></template>
    <template #modal-body-slot> </template>
  </Modal>
</template>


<script>
import { useRoute } from 'vue-router'
import { tasksService } from '../services/TasksService.js'
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },

  setup(props) {
      const route = useRoute();
    return {
        async toggleTask()
        {
            try
            {
                await tasksService.toggleTask(props.task.id, route.params.id, { isComplete: !props.task.isComplete });
            }
            catch(error)
            {
                logger.error("[Task.vue > toggleTask()]", error.message);
                Pop.toast(error.message, "error");
            }
        },
        async deleteTask()
        {
            try
            {
                if(await Pop.confirm())
                {
                    await tasksService.deleteTask(props.task.id, route.params.id);
                    Pop.toast("Task deleted", "success");
                }
            }
            catch(error)
            {
                logger.error("[Task.vue > deleteTask()]", error.message);
                Pop.toast(error.message, "error");
            }
        }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>