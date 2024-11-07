import { getRandomString } from "../../labs/lab1/task8"
import { IssueData } from "../data/issue.data"

type IssueModel = {
    title: string,
    description?: string,
    url: string,
    tag: string,
    commentText: string,
}

function createIssueModel(data: IssueData): IssueModel {
    return {
        title: data.title,
        description: data.description,
        url: data.url,
        tag: data.tag,
        commentText: data.commentText
    }
}

export {
    IssueModel,
    createIssueModel,
}