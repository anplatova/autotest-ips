import { AxiosRequestConfig, AxiosResponse } from "axios"
import { GitAPIProvider } from "../../common/api/GitAPIProvider"
import { AddLabelsToAnIssueData, CreateIssueData, CreateLabelData } from "./IssueAPIDataProvider"

class IssueAPIProvider extends GitAPIProvider {
    public createLabel<T>(owner: string, repo: string, data: CreateLabelData): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner}/${repo}/labels`,
            'POST',
            JSON.stringify(data),
        )
        return this.sendRequest(config)
    }

    public deleteLabel<T>(owner: string, repo: string, labelName: string): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner}/${repo}/labels/${labelName}`,
            'DELETE',
        )
        return this.sendRequest(config)
    }

    public createIssue<T>(owner: string, repo: string, dataIssue?: CreateIssueData): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner}/${repo}/issues`,
            'POST',
            JSON.stringify(dataIssue),
        )
        return this.sendRequest(config)
    }

    public addLabelsToAnIssue<T>(owner: string, repo: string, issueNumber: number, data: AddLabelsToAnIssueData): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner}/${repo}/issues/${issueNumber}/labels`,
            'POST',
            JSON.stringify(data),
        )
        return this.sendRequest(config)
    }

    public removeALabelFromAnIssue<T>(owner: string, repo: string, labelName: string, issueNumber: number): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner}/${repo}/issues/${issueNumber}/labels/${labelName}`,
            'DELETE',
        )
        return this.sendRequest(config)
    }

    public getIssues<T>(owner: string, repo: string): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner}/${repo}/issues`,
            'GET',
        )
        return this.sendRequest(config)
    }

    public getLabels<T>(owner: string, repo: string, labelName: string): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner}/${repo}/labels/${labelName}`,
            'GET',
        )
        return this.sendRequest(config)
    }
}

export {
    IssueAPIProvider,
}