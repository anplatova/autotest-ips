import { getRandomString } from "../../common/data/functions/randomString"
import { IssueData } from "../data/issue.data"
import { LabelModel } from "./label.model"

type IssueModel = {
    body?: string,
    commentText?: string,
    labels?: LabelModel[],
    title: string,
    url?: string,
    number?: number,
}

function createIssueModel(data?: IssueData): IssueModel {
    const issueModel: IssueModel = {
        title: data?.title ?? getRandomString(10),
    }
    if (data?.body) {
        issueModel.body = data.body
    }
    if (data?.commentText) {
        issueModel.commentText = data.commentText
    }
    if (data?.labels) {
        issueModel.labels = data.labels
    }
    if (data?.url) {
        issueModel.url = data.url
    }
    return issueModel
}

export {
    IssueModel,
    createIssueModel,
}