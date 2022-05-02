import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext.js";

class ProjectsService
{
    async getAll(creatorId)
    {
        const gotten = await dbContext.Projects.find({ creatorId }).populate('creator');
        return gotten;
    }

    async create(data)
    {
        const created = await dbContext.Projects.create(data);
        await created.populate('creator');
        return created;
    }

    async edit()
    {
        // Purposfully empty for potential stretch goal
    }

    async remove(id, userId)
    {
        const deleted = await dbContext.Projects.findById(id);
        if(!deleted)
        {
            throw new BadRequest("Could not find project with that id");
        }
        if(deleted.creatorId.toString() !== userId)
        {
            throw new Forbidden("You do not have permission to delete this.");
        }
        await deleted.remove()
        return deleted;
    }
}

export const projectsService = new ProjectsService();