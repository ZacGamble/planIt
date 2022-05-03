<template>
  <div class="row">
    <div class="col-12">
        <a data-bs-toggle="collapse" :data-bs-target="'#sprint-' + sprint.id" role="button">
        <div  class="d-flex justify-content-between mx-2 mt-2 p-2 border border-dark bg-light">
            <div class="d-flex">
                <p class="me-2 my-0">ICON</p>
                <h5 class="mx-2 my-0">{{ sprint.name }}</h5>
                <h5 class="text-primary ms-2 my-0">{{ tasksWeight }} <i class="mdi mdi-weight"></i></h5>
            </div>
            <div class="d-flex">
                <button class="btn btn-outline-primary me-4">+ Add Task</button>
                <h5 class="my-0 me-2">{{tasksComplete}}/{{tasks.length}} Tasks Complete</h5>  
            </div>

        </div>
      </a>
      <div :id="'sprint-' + sprint.id" class="collapse mx-2 mb-2 p-2 border border-dark bg-gray border-top-0">
          tasks
          tasks
          tasks
          tasks
          tasks
          tasks
          tasks
          tasks
          tasks
          tasks
      </div>

    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
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
    return {
        tasks,
        tasksWeight: computed(() => {
            let sum = 0;
            tasks.value.forEach(task => sum += task.weight)
            return sum;
        }),
        tasksComplete: computed(() => tasks.value.filter(task => task.isComplete === true).length)
    }
  }
}
</script>


<style lang="scss" scoped>
</style> 