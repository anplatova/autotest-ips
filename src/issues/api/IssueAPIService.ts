import { AxiosResponse } from "axios"
import { IssueAPIProvider } from "./IssueAPIProvider"
import { LabelModel } from "../model/label.model"
import { CreateIssueWithLabels, CreateLabelData, IssueAPIDataProvider } from "./IssueAPIDataProvider"
import { IssueModel } from "../model/issue.model"

type CreateLabelResponse = {
    id: number,
    node_id: string,
    url: string,
    name: string,
    description: string,
    color: string,
    default: boolean,
}

type CreateIssueWithLabelsResponse = {
    id: number,
    url: string,
    labels_url: string,
    title: string,
    body: string,
}

class IssueAPIService {
    public static async createLabel(label: LabelModel): Promise<CreateLabelResponse> {
        const data: CreateLabelData = IssueAPIDataProvider.getLabelData(label)
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
        const response: AxiosResponse<CreateLabelResponse> = await issueAPIProvider.createLabel(data)
        return response.data
    }

    public static async deleteLabel(label: LabelModel): Promise<void> {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
        await issueAPIProvider.deleteLabel(label.name)
        return
    }

    public static async createIssueWithLabels(issue: IssueModel): Promise<CreateIssueWithLabelsResponse> {
        const dataIssue: CreateIssueWithLabels = IssueAPIDataProvider.getIssueWithLabelsData(issue)
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
        const response: AxiosResponse<CreateIssueWithLabelsResponse> = await issueAPIProvider.createIssueWithLabels(dataIssue)
        return response.data
    }
}

export {
    CreateLabelResponse,
    CreateIssueWithLabelsResponse,
    IssueAPIService,
}