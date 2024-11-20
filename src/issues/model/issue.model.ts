import { IssueData } from "../data/issue.data"
import { LabelModel } from "./label.model"

type IssueModel = {
    title: string,
    description?: string,
    url: string,
    commentText: string,
    label?: LabelModel,
}

function createIssueModel(data: IssueData): IssueModel {
    return {
        title: data.title,
        description: data.description,
        url: data.url,
        commentText: data.commentText,
        label: data.label
    }
}

export {
    IssueModel,
    createIssueModel,
}