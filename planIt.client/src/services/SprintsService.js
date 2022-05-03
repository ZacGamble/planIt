import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class SprintsService {
    async getByProjectId(projectId){
       const res = await api.get('api/projects/' + projectId + '/sprints')
        AppState.sprints = res.data
        logger.log('[sprints service] > getByProjectId Response',res.data)
    }
}

export const sprintsService = new SprintsService()