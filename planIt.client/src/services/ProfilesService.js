import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class ProfilesService
{
    async getProjects()
    {
        const res = await api.get('api/projects');
        logger.log("Profiles Service > getProjects() res", res.data);
        AppState.projects = res.data;
    }
}

export const profilesService = new ProfilesService();