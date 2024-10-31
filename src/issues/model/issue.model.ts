import { getRandomString } from "../../labs/lab1/task8"

type IssueModel = {
    title: string,
    description: string
}

function createIssueModel(entities?: Partial<IssueModel>): IssueModel {
    return {
        title: entities?.title ?? getRandomString(10),
        description: entities?.description ?? getRandomString(10)
    }
}

export {
    IssueModel,
    createIssueModel,
}