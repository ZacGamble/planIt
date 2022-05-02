import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext.js";

class TasksService
{
    async getAll(projectId)
    {
        return await dbContext.Tasks.find({ projectId });
    }

    async getById(id)
    {
        const found = await dbContext.Tasks.findById(id).populate('creator');
        if(!found)
        {
            throw new BadRequest("Could not find task with that id.");
        }
        return found;
    }

    async create(data)
    {
        const created = await dbContext.Tasks.create(data);
        await created.populate('creator');
        return created;
    }
    
    async edit(data)
    {
        const edited = await this.getById(data.id)
        if(edited.creatorId.toString() !== data.creatorId)
        {
            throw new Forbidden("You do not have permission to edit this.");
        }
        edited.sprintId = data.sprintId || edited.sprintId;
        await edited.save();
        return edited;
    }

    async remove(id, userId)
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

export const tasksService = new TasksService();