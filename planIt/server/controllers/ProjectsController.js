import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController.js'
export class ProjectsController extends BaseController {
    constructor (){
        super('api/projects')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .get('', this.getAll)
        .post('', this.create)
        .put('/:id', this.edit)
        .delete('/:id', this.remove)

    }
    async getAll(req, res, next) {
try {
  const projects = await projectsService.getAll(req.userInfo.id)
  return res.send(projects)
} catch (error) {
  next(error)
  
}
    }
    async create(req, res, next) {
try {
  req.body.creatorId = req.userInfo.id
  const project = await projectsService.create(req.body)
  return res.send(project)
} catch (error) {
  next(error)
  
}
    }
   async edit(req, res, next) {
try {
  req.body.id = req.params.id
  req.body.creatorId = req.userInfo.id
  const project = await projectsService.edit(req.body)
  return res.send(project)

} catch (error) {
  next(error)
  
}
    }
   async remove(req, res, next) {
try {
    await projectsService.remove(req.params.id, req.userInfo.id)
    return res.send('Project deleted')
  
} catch (error) {
  next(error)
  
}
    }
    

}