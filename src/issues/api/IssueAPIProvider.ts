import { AxiosRequestConfig, AxiosResponse } from "axios"
import { GitAPIProvider } from "../../common/api/GitAPIProvider"
import { CreateLabelData } from "./IssueAPIDataProvider"
import { auth } from "../../../credential"

class IssueAPIProvider extends GitAPIProvider {
    public createLabel<T>(data: CreateLabelData): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${auth.login}/test-for-study/labels`,
            'POST',
            JSON.stringify(data),
        )
        return this.sendRequest(config)
    }

    public deleteLabel<T>(labelName: string): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${auth.login}/test-for-study/labels/${labelName}`,
            'DELETE',
        )
        return this.sendRequest(config)
    }
}

export {
    IssueAPIProvider,
}