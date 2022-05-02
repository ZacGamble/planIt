import { Auth0Provider } from "@bcwdev/auth0provider"
import { tasksService } from "../services/TasksService.js"
import BaseController from "../utils/BaseController"

export class TasksController extends BaseController{
    constructor(){
        super('api/projects')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .get('/:projectId/tasks', this.getAll)
        .post('/:projectId/tasks', this.create)
        .put('/:projectId/tasks/:taskId', this.edit)
        .delete('/:projectId/tasks/:taskId', this.remove)
    }
    async getAll(req, res, next) {
        try {
            const tasks = await tasksService.getAll(req.params.projectId)
            return res.send(tasks)
        } catch (error) {
            next()
        }
    }
    async create(req, res, next) {
        try {

            //may need REVIEW

            req.body.creatorId = req.userInfo.id
            req.body.projectId = req.params.projectId
            const newTask = await tasksService.create(req.body)
            return res.send(newTask)
        } catch (error) {
            next()
        }
    }
    async edit(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const task = await tasksService.create(req.body)
            return res.send(task)
        } catch (error) {
            next()
        }
    }
    async remove(req, res, next) {
        try {
            const removedTask = await sprintsService.remove(req.params.taskId, req.userInfo.id)
            return res.send(removedTask)
        } catch (error) {
            next()
        }
    }
}