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

    clearActive()
    {
        AppState.activeProject = null;
    }
    
    async createProject(data)
    {
        const res = await api.post("api/projects", data);
        logger.log("Projects Service > create response", res.data);
        AppState.projects.unshift(res.data);
        return res.data.id;
    }

    async deleteProject(id)
    {
        const res = await api.delete("api/projects/" + id);
        AppState.projects = AppState.projects.filter(project => project.id !== res.data.id);
    }
}

export const projectsService = new ProjectsService();