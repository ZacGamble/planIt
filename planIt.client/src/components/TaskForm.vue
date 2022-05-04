<template>
    <form class="d-flex flex-column" @submit.prevent="editTask">
        <div class="d-flex flex-column">
            <label for="task-name">Name</label>
            <input type="text" name="task-name" class="" placeholder="Task Name" v-model="edit.name" />
        </div>
        <div class="d-flex mt-3">
            <div>
                <label for="task-weight">Weight</label>
                <input type="number" name="task-name" min="0" v-model="edit.weight" />
            </div>
            <div>
                <label for="task-sprint">Sprint</label>
                <select name="task-sprint" v-model="edit.sprintId">
                    <option v-for="s in sprints" :key="s.id" :value="s.id" :selected="s.id === activeTask.sprintId">{{s.name}}</option>
                </select>
            </div>
        </div>
        <div class="d-flex mt-4 align-self-end">
            <button class="btn text-dark lighten-30" type="button" @click="stopEditing">Cancel</button>
            <button class="btn btn-primary ms-5" type="submit">Save</button>
        </div>
    </form>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { onMounted } from '@vue/runtime-core';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { useRoute } from 'vue-router';
import { tasksService } from '../services/TasksService.js';
export default
{
    setup()
    {
        const activeTask = computed(() => AppState.activeTask);
        const edit = ref({});
        const editing = computed(() => AppState.editingTask);
        const route = useRoute();
        const stopEditing = (() =>
            {
                AppState.editingTask = false;
            });
        onMounted(() =>
        {
            edit.value = {...activeTask.value};
        });

        return {
            edit,
            activeTask,
            sprints: computed(() => AppState.sprints),
            stopEditing,
            async editTask()
            {
                try
                {
                    edit.value.projectId = route.params.id;
                    await tasksService.editTask(edit.value);
                    this.stopEditing();
                    Pop.toast("Task edited", "success");
                }
                catch(error)
                {
                    logger.error("[TaskForm.vue > editTask()]", error.message);
                    Pop.toast(error.message, "error");
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>