import { AxiosRequestConfig, AxiosResponse } from "axios"
import { GitAPIProvider } from "../../common/api/GitAPIProvider"
import { CreateLabel } from "./IssueAPIDataProvider"
import { auth } from "../../../credential"

class IssueAPIProvider extends GitAPIProvider {
    public createLabel<T>(data: CreateLabel): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${auth.login}/test-for-study/labels`,
            'POST',
            JSON.stringify(data),
        )
        return this.sendRequest(config)
    }
}

export {
    IssueAPIProvider,
}