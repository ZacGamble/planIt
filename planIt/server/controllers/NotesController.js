import { Auth0Provider } from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService";
import BaseController from "../utils/BaseController";

export class NotesController extends BaseController {
    constructor() {
        super('api/projects')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .get('/:projectId/notes', this.getAll)
        .post('/:projectId/notes', this.create)
        .delete('/:projectId/notes/:noteId', this.remove)
    }
   async getAll(req, res, next) {
        try {
            const notes = await notesService.getAll(req.params.projectId)
            return res.send(notes)
        } catch (error) {
            next(error)
        }
    }
   async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            req.body.projectId = req.params.projectId
            const newNote = await notesService.create(req.body)
            return res.send(newNote)
        } catch (error) {
            next(error)
        }
    }
   async remove(req, res, next) {
        try {
            const removedNote = await notesService.remove(req.params.noteId, req.userInfo.id)
            return res.send(removedNote)
        } catch (error) {
            next(error)
        }
    }
}