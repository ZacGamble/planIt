import { Auth0Provider } from "@bcwdev/auth0provider";
import { sprintsService } from "../services/SprintsService";
import BaseController from "../utils/BaseController";

export class SprintsController extends BaseController {
    constructor(){
        super('api/projects')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .get('/:projectId/sprints', this.getAll)
        .post('/:projectId/sprints', this.create)
        .delete('/:projectId/sprints/:sprintId', this.remove)
    }
   async getAll(req, res, next) {
try {
    const sprints = await sprintsService.getAll(req.params.projectId)
    return res.send(sprints)
} catch (error) {
    next(error)
}    }
   async create(req, res, next) {
try {
    req.body.creatorId = req.userInfo.id
    req.body.projectId = req.params.projectId
    const sprint = await sprintsService.create(req.body)
    return res.send(sprint)
} catch (error) {
    next(error)
}    }
   async remove(req, res, next) {
try {
    const removedSprint = await sprintsService.remove(req.params.sprintId, req.userInfo.id)
    return res.send(removedSprint)
    
} catch (error) {
    next(error)
}  
  }
}