import { AxiosResponse } from "axios"
import { IssueAPIProvider } from "./IssueAPIProvider"
import { LabelModel } from "../model/label.model"
import { AddLabelsToAnIssueData, CreateIssueData, CreateLabelData, IssueAPIDataProvider } from "./IssueAPIDataProvider"
import { IssueModel } from "../model/issue.model"

type CreateLabelResponse = {
    id: number,
    html_url: string,
    name: string,
    description: string,
    color: string,
}

type CreateIssueResponse = {
    id: number,
    html_url: string,
    title: string,
    body: string,
    number: number,
    status: string,
}

type AddLabelsToAnIssueResponse = {
    id: number,
    html_url: string,
    name: string,
    description: string,
    color: string,
}

type GetIssueResponse = IssueInfo[]

type IssueInfo = {
    html_url: string,
    title: string,
}

class IssueAPIService {
    public static async createLabel(owner: string, repo: string, label: LabelModel): Promise<CreateLabelResponse> {
        const data: CreateLabelData = IssueAPIDataProvider.getLabelData(label)
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
        const response: AxiosResponse<CreateLabelResponse> = await issueAPIProvider.createLabel(owner, repo, data)
        return response.data
    }
    // обернуть в try catch

    public static async deleteLabel(owner: string, repo: string, label: LabelModel): Promise<void> {

        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
        await issueAPIProvider.deleteLabel(owner, repo, label.name)
        return
    } // обернуть в try catch

    public static async createIssue(owner: string, repo: string, issue: IssueModel): Promise<CreateIssueResponse> {
        try {
            const data: CreateIssueData = IssueAPIDataProvider.getIssueData(issue)
            const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
            const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(owner, repo, data)
            return response.data
        } catch (error) {
            throw new Error(`Create an Issue failed ${error}`)
        }
    }

    public static async addLabelsToAnIssue(owner: string, repo: string, issueNumber: number, labels: LabelModel[]): Promise<AddLabelsToAnIssueResponse> {
        try {
            const data: AddLabelsToAnIssueData = IssueAPIDataProvider.addLabelsToAnIssueData(labels)
            const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
            const response: AxiosResponse<AddLabelsToAnIssueResponse> = await issueAPIProvider.addLabelsToAnIssue(owner, repo, issueNumber, data)
            return response.data
        } catch (error) {
            throw new Error(`Add label to issue failed ${error}`)
        }
    }

    public static async getIssues(owner: string, repo: string): Promise<GetIssueResponse> {
        try {
            const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
            const response: AxiosResponse<GetIssueResponse> = await issueAPIProvider.getIssues(owner, repo)
            return response.data
        } catch (error) {
            throw new Error(`Get Issues failed ${error}`)
        }
    }
}

export {
    AddLabelsToAnIssueResponse,
    GetIssueResponse,
    CreateLabelResponse,
    CreateIssueResponse,
    IssueAPIService,
    IssueInfo,
}