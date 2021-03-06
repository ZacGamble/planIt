import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  activeProject: null,
  projects: [],
  sprints: [],
  tasks: [],
  activeTask: null,
  notes: [],
  editingTask: false,
})
