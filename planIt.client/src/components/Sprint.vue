<template>
  <div class="row">
    <div class="col-12 no-select">
      <a
        @click="toggleCollapse"
        role="button"
        :title="'click to toggle ' + sprint.name"
      >
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
          <div class="d-flex align-items-center">
            <p class="me-2 my-0 fs-1">{{ index + 1 }}</p>
            <h5 class="mx-2 my-0">{{ sprint.name }}</h5>
            <h5 class="text-secondary-gradient ms-2 my-0">
              {{ tasksWeight }}
              <i class="mdi mdi-weight"></i>
            </h5>
          </div>
          <div class="d-flex align-items-center">
            <button class="btn btn-outline-primary me-4" @click.stop="addTask" v-show="projectCreatorId === accountId">
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
          bg-secondary
          border-top-0
          position-relative
        "
        :class="{ 'not-shown': collapsed, 'p-2': !collapsed }"
      >
        <div class="text-center fs-2 fw-bold my-3" v-if="!(tasks.length > 0)">
          No tasks yet.
        </div>
        <Task v-for="t in tasks" :key="t.id" :task="t" />
        <div class="my-5" v-if="projectCreatorId === accountId"></div>
        <div
          class="d-flex sprint-delete-button action align-items-center"
          @click="deleteSprint"
          v-if="projectCreatorId === accountId"
        >
          <p class="m-0 text-secondary-gradient">Delete {{ sprint.name }}</p>
          <i class="mdi mdi-delete text-secondary-gradient fs-4 ms-2"></i>
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

  <OffCanvas class="offcanvas-end" id="task-offcanvas">
    <template #offcanvas-header-slot>
      <div class="d-flex justify-content-between flex-grow-1 ms-4">
        <h4>{{ activeTask?.name }}</h4>
        <i class="mdi mdi-pencil action" @click="startEdit" v-if="!editing && projectCreatorId === accountId"></i>
      </div>
    </template>
    <template #offcanvas-body-slot>
      <TaskForm v-if="activeTask && editing" />
      <div>
        <p>Status:</p>
        <div class="d-flex align-items-center mx-3">
          <button
            class="btn rounded-pill px-4 fw-bold"
            :class="{
              'btn-primary': !activeTask?.isComplete,
              'btn-outline-primary': activeTask?.isComplete,
            }"
            @click="setTaskStatus(false)"
          >
            Pending
          </button>
          <div
            class="border-top border-bottom flex-grow-1 not-shown mx-5"
          ></div>
          <button
            class="btn rounded-pill px-4 fw-bold"
            :class="{
              'btn-success': activeTask?.isComplete,
              'btn-outline-success': !activeTask?.isComplete,
            }"
            @click="setTaskStatus(true)"
          >
            Done
          </button>
        </div>
      </div>
      <div class="mt-3 flex-column d-flex">
        <h5 class="align-self-center text-primary-gradient">Notes</h5>
        <hr class="mx-5" />
        <div>
          <form @submit.prevent="addNote">
            <div class="d-flex flex-column my-3">
              <label for="new-note" class="mb-3">Add a Note</label>
              <div class="input-group mb-3">
                <input
                  type="text"
                  placeholder="Say Something..."
                  name="new-note"
                  class="form-control"
                  v-model="newNote.body"
                />
                <button
                  class="btn btn-primary"
                  type="submit"
                  id="button-addon2"
                >
                  <i class="mdi mdi-chevron-right"></i>
                </button>
              </div>
            </div>
          </form>
          <Note v-for="n in activeNotes" :key="n.id" :note="n" />
        </div>
      </div>
    </template>
  </OffCanvas>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { Modal } from 'bootstrap';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { sprintsService } from '../services/SprintsService.js';
import { useRoute } from 'vue-router';
import { notesService } from '../services/NotesService.js';
import { tasksService } from '../services/TasksService.js';
export default {
  props:
  {
    sprint:
    {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }

  },

  setup(props) {
    const tasks = computed(() => AppState.tasks.filter(task => task.sprintId === props.sprint.id));
    const collapsed = ref(true)
    const route = useRoute()
    const activeTask = computed(() => AppState.activeTask)
    const newNote = ref({})
    return {
      newNote,
      activeTask,
      collapsed,
      tasks,
      editing: computed(() => AppState.editingTask),
      activeNotes: computed(() => AppState.notes.filter(note => note.taskId === activeTask.value?.id)),
      accountId: computed(() => AppState.account.id),
      projectCreatorId: computed(() => AppState.activeProject.creatorId),
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
      },
      async addNote() {
        try {
          newNote.value.projectId = route.params.id
          newNote.value.taskId = activeTask?.value.id
          logger.log()
          await notesService.addNote(newNote.value)
          Pop.toast('Note created!', 'success')
          newNote.value = {}
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      startEdit() {
        AppState.editingTask = true;
      },
      async setTaskStatus(status) {
        try {
          const task = {
            id: activeTask.value.id,
            projectId: route.params.id,
            isComplete: status
          };
          await tasksService.editTask(task);
        }
        catch (error) {
          logger.error("[Task.vue > toggleTask()]", error.message);
          Pop.toast(error.message, "error");
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