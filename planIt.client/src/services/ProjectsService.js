import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class ProjectsService
{
    async getProjects()
    {
        const res = await api.get('api/projects');
        
        AppState.projects = res.data;
    }
    async getByProjectId(id){
        const res = await api.get('api/projects/' + id)
        AppState.activeProject = res.data
        logger.log('The active project', res.data)
    }
}

export const projectsService = new ProjectsService();