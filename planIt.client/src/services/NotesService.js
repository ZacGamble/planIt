import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class NotesService
{
    async getByProjectId(projectId){
        const res = await api.get('api/projects/' + projectId + '/notes')
         AppState.notes = res.data
         logger.log('[notes service] > getByProjectId Response',res.data)
     }

     clearActive()
     {
         AppState.notes = [];
     }
}

export const notesService = new NotesService();