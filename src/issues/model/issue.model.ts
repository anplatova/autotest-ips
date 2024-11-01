import { getRandomString } from "../../labs/lab1/task8"
import { IssueData } from "../data/issue.data"

type IssueModel = {
    title: string,
    longTitle: string,
    description?: string,
    url: string,
    tag: string,
}

function createIssueModel(data: IssueData): IssueModel {
    return {
        title: data.title,
        longTitle: data.longTitle,
        description: data.description,
        url: data.url,
        tag: data.tag
    }
}

export {
    IssueModel,
    createIssueModel,
}