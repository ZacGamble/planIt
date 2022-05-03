import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class TasksService
{
    async getByProjectId(projectId){
        const res = await api.get('api/projects/' + projectId + '/tasks')
         AppState.tasks = res.data
         logger.log('[tasks service] > getByProjectId Response',res.data)
     }
     async createTask(data){
         const res = await api.post('api/projects/' + data.projectId + '/tasks', data)
         logger.log('Tasks service > create task',res.data)
         AppState.tasks.push(res.data)
     }

     clearActive()
     {
         AppState.tasks = [];
     }

     async toggleTask(id, projectId, data)
     {
         const res = await api.put("api/projects/" + projectId + "/tasks/" + id, data);
         logger.log("toggle tasks Response", res.data);
         const index = AppState.tasks.findIndex(task => task.id === res.data.id);
         AppState.tasks.splice(index, 1, res.data);
     }

     async deleteTask(id, projectId)
     {
         const res = await api.delete("api/projects/" + projectId + "/tasks/" + id);
         AppState.tasks = AppState.tasks.filter(task => task.id !== res.data.id);
     }
}

export const tasksService = new TasksService();