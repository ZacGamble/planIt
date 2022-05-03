<template>
  <div class="row">
    <div class="col-12">
      <a @click="toggleCollapse" role="button">
        <div
          class="
            d-flex
            justify-content-between
            mx-2
            mt-2
            p-2
            border border-dark
            bg-light
          "
        >
          <div class="d-flex">
            <p class="me-2 my-0">ICON</p>
            <h5 class="mx-2 my-0">{{ sprint.name }}</h5>
            <h5 class="text-primary ms-2 my-0">
              {{ tasksWeight }} <i class="mdi mdi-weight"></i>
            </h5>
          </div>
          <div class="d-flex">
            <button class="btn btn-outline-primary me-4" @click.stop="addTask">
              + Add Task
            </button>
            <h5 class="my-0 me-2">
              {{ tasksComplete }}/{{ tasks.length }} Tasks Complete
            </h5>
          </div>
        </div>
      </a>
      <div
        :id="'sprint-' + sprint.id"
        class="
          showable
          ps-2
          mx-2
          mb-2
          border border-dark
          bg-grey
          border-top-0
          position-relative
        "
        :class="{ 'not-shown': collapsed, 'p-2': !collapsed }"
      >
        <Task v-for="t in tasks" :key="t.id" :task="t" />
        <div class="my-3"></div>
        <div class="d-flex sprint-delete-button action" @click="deleteSprint">
          <p class="m-0">Delete {{ sprint.name }}</p>
          <i class="mdi mdi-delete"></i>
        </div>
      </div>
    </div>
  </div>
  <Modal :id="'create-task-modal' + sprint.id">
    <template #modal-header-slot> <h2>Add task</h2> </template>
    <template #modal-body-slot>
      <CreateTaskForm :sprintId="sprint.id" />
    </template>
  </Modal>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { Modal } from 'bootstrap';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { sprintsService } from '../services/SprintsService.js';
import { useRoute } from 'vue-router';
export default {
  props:
  {
    sprint:
    {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const tasks = computed(() => AppState.tasks.filter(task => task.sprintId === props.sprint.id));
    const collapsed = ref(true)
    const route = useRoute()
    return {
      collapsed,
      tasks,
      tasksWeight: computed(() => {
        let sum = 0;
        tasks.value.forEach(task => sum += task.weight)
        return sum;
      }),
      tasksComplete: computed(() => tasks.value.filter(task => task.isComplete === true).length),
      toggleCollapse() {
        collapsed.value = !collapsed.value
      },
      addTask() {
        Modal.getOrCreateInstance(document.getElementById('create-task-modal' + props.sprint.id)).show()
      },
      async deleteSprint() {
        try {
          if (await Pop.confirm()) {
            await sprintsService.deleteSprint(props.sprint.id, route.params.id)
            Pop.toast('Sprint deleted', 'success')
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.not-shown {
  height: 0px;
}
.showable {
  overflow-y: hidden;
  transition: all 0.2s linear;
}
.sprint-delete-button {
  position: absolute;
  bottom: 5px;
  right: 5px;
}
</style> 