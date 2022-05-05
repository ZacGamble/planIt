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

     async addNote(newNote){
        const res = await api.post('api/projects/' + newNote.projectId + '/notes', newNote)
        AppState.notes.unshift(res.data)
     }

     clearActive()
     {
         AppState.notes = [];
     }

     async deleteNote(id, projectId)
     {
         const res = await api.delete("api/projects/" + projectId + "/notes/" + id);
         const index = AppState.notes.findIndex(note => note.id === res.data.id);
         AppState.notes.splice(index, 1);
     }
}

export const notesService = new NotesService();