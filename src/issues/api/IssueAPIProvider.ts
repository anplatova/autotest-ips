import { AxiosRequestConfig, AxiosResponse } from "axios"
import { GitAPIProvider } from "../../common/api/GitAPIProvider"
import { CreateLabel } from "./IssueAPIDataProvider"

class IssueAPIProvider extends GitAPIProvider {
    public create<T>(organisation: string, data: CreateLabel): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/orgs/${organisation}/teams`,
            'POST',
            JSON.stringify(data),
        )
        return this.sendRequest(config)
    }
}

export {
    IssueAPIProvider,
}