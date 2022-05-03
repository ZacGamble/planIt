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
}

export const tasksService = new TasksService();