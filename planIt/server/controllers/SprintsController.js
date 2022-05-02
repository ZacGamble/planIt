import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";

export class SprintsController extends BaseController {
    constructor(){
        super('api/projects/:projectId/sprints')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .get('', this.getAll)
        .post('', this.create)
        .delete('/:sprintId', this.remove)
    }
   async getAll(req, res, next) {
try {
    const sprints = await sprintsService.getAll(req.userInfo.id)
    return res.send(sprints)
} catch (error) {
    next(error)
}    }
   async create(req, res, next) {
try {
    req.body.creatorId = req.userInfo.userId
    const sprint = await sprintsService.create(req.body)
    return res.send(sprint)
} catch (error) {
    next(error)
}    }
   async remove(req, res, next) {
try {
    const removedSprint = await sprintsService.remove(req.params.id, req.userInfo.id)
    return res.send(removedSprint)
    
} catch (error) {
    next(error)
}    }
}