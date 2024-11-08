import { AxiosRequestConfig, AxiosResponse } from "axios"
import { GitAPIProvider } from "../../common/api/GitAPIProvider"
import { CreateTeamRequest } from "./TeamAPIDataProvider"

class TeamAPIProvider extends GitAPIProvider {
    public create<T>(organisation: string, data: CreateTeamRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/orgs/${organisation}/teams`,
            'POST',
            JSON.stringify(data),
        )
        return this.sendRequest(config)
    }
}

export {
    TeamAPIProvider,
}