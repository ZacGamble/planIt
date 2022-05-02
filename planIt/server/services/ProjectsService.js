import { dbContext } from "../db/DbContext.js";

class ProjectsService
{
    async getAll(id)
    {
        return await dbContext.Projects.find({ id });
    }

    async create(data)
    {
        const created = await dbContext.Projects.create(data);
        return created;
    }

    async edit()
    {
        // Purposfully empty for potential stretch goal
    }

    async remove(id)
    {
        const deleted = await dbContext.Projects.findById(id);
        await deleted.remove()
        return deleted;
    }
}

export const projectsService = new ProjectsService();