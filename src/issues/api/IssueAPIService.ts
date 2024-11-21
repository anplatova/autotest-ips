import { AxiosResponse } from "axios"
import { IssueAPIProvider } from "./IssueAPIProvider"
import { LabelModel } from "../model/label.model"
import { CreateLabel, IssueAPIDataProvider } from "./IssueAPIDataProvider"

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
        const data: CreateLabel = IssueAPIDataProvider.getLabelData(label)
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
        const response: AxiosResponse<CreateLabelResponse> = await issueAPIProvider.createLabel(data)
        return response.data
    }
}

export {
    CreateLabelResponse,
    IssueAPIService,
}