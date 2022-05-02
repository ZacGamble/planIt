import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext.js";

class SprintsService
{
    async getAll(projectId)
    {
        return await dbContext.Sprints.find({ projectId });
    }

    async getById(id)
    {
        const found = await dbContext.Sprints.findById(id);
        if(!found)
        {
            throw new BadRequest("Could not find sprint with that id");
        }
        return found;
    }

    async create(data)
    {
        const created = await dbContext.Sprints.create(data);
        return created;
    }

    async delete(id, userId)
    {
        const deleted = await this.getById(id);
        if(deleted.creatorId.toString() !== userId)
        {
            throw new Forbidden("You do not have permission to delete this.");
        }
        deleted.remove();
        return deleted;
    }
}

export const sprintsService = new SprintsService();