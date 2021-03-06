import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext.js";
import { projectsService } from "./ProjectsService.js";

class SprintsService
{
    async getAll(projectId)
    {
        return await dbContext.Sprints.find({ projectId }).populate('creator');
    }

    async getById(id)
    {
        const found = await dbContext.Sprints.findById(id).populate('creator');
        if(!found)
        {
            throw new BadRequest("Could not find sprint with that id.");
        }
        return found;
    }

    async create(data)
    {
        const projectOwner = (await projectsService.getById(data.projectId)).creatorId;
        if(projectOwner.toString() !== data.creatorId)
        {
            throw new Forbidden("You cannot create sprints on this project.");
        }
        const created = await dbContext.Sprints.create(data);
        await created.populate('creator');
        return created;
    }

    async remove(id, userId)
    {
        const deleted = await this.getById(id);
        const projectOwner = (await projectsService.getById(deleted.projectId)).creatorId;
        if(deleted.creatorId.toString() !== userId && projectOwner.toString() != userId)
        {
            throw new Forbidden("You do not have permission to delete this.");
        }
        deleted.remove();
        return deleted;
    }
}

export const sprintsService = new SprintsService();