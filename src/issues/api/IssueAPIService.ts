import { AxiosResponse } from "axios"
import { IssueAPIProvider } from "./IssueAPIProvider"
import { LabelModel } from "../model/label.model"
import { CreateLabelData, IssueAPIDataProvider } from "./IssueAPIDataProvider"

type CreateLabelResponse = {
    id: number,
    node_id: string,
    url: string,
    name: string,
    description: string,
    color: string,
    default: boolean,
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
}

export {
    CreateLabelResponse,
    IssueAPIService,
}