<template>
  <div class="component my-2 py-2 ms-5 no-select">
    <div class="d-flex">
      <i
        class="action pe-1 fs-3 mdi"
        title="click to toggle"
        :class="{
          'mdi-checkbox-outline': task.isComplete,
          'mdi-checkbox-blank-outline': !task.isComplete,
        }"
        @click="toggleTask"
      ></i>
      <div class="d-flex align-items-center">
        <p class="my-0 px-3 py-1 rounded-pill bg-danger">{{ task.name }}</p>
      </div>
      <i
        class="ps-1 action fs-3 text-grey mdi mdi-delete"
        :title="'delete ' + task.name"
        @click="deleteTask"
      ></i>
    </div>
    <div class="d-flex flex-column">
      <!-- <div class="d-flex">
            <i class="mdi mdi-run"></i>
            TODO created on will go here if we do it
        </div> -->
      <div
        class="
          text-primary
          mt-3
          border-dark border-start
          pb-4
          ps-2
          position-relative
          fs-5
        "
      >
        <div class="task-details ms-3">
          <span class="pe-4" @click="openOffCanvas"
            >{{ notesCount
            }}<i class="mdi mdi-comment action" title="open detailed view"></i
          ></span>
          <span>{{ task.weight }}<i class="mdi mdi-weight"></i></span>
        </div>
      </div>
    </div>
  </div>
  <Modal id="create-task-modal">
    <template #modal-header-slot></template>
    <template #modal-body-slot> </template>
  </Modal>
</template>


<script>
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router'
import { tasksService } from '../services/TasksService.js'
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { Offcanvas } from 'bootstrap';
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const route = useRoute();
    const notes = computed(() => AppState.notes.filter(note => note.taskId === props.task.id));
    return {
      notes,
      notesCount: computed(() => notes.value.length),
      async toggleTask() {
        try {
          await tasksService.toggleTask(props.task.id, route.params.id, { isComplete: !props.task.isComplete });
        }
        catch (error) {
          logger.error("[Task.vue > toggleTask()]", error.message);
          Pop.toast(error.message, "error");
        }
      },
      async deleteTask() {
        try {
          if (await Pop.confirm()) {
            await tasksService.deleteTask(props.task.id, route.params.id);
            Pop.toast("Task deleted", "success");
          }
        }
        catch (error) {
          logger.error("[Task.vue > deleteTask()]", error.message);
          Pop.toast(error.message, "error");
        }
      },
      openOffCanvas() {
        AppState.activeTask = props.task;
        Offcanvas.getOrCreateInstance(document.getElementById("task-offcanvas")).show();
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.task-details {
  position: relative;
  top: -0.5rem;
}
</style>