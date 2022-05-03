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
}

export const tasksService = new TasksService();