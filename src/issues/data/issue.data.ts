import { getRandomString } from "../../common/data/functions/randomString"
import { LabelModel } from "../model/label.model"

type IssueData = {
    title: string,
    body?: string,
    url: string,
    commentText?: string,
    labels?: LabelModel,
}

const issueData: IssueData = {
    title: `${getRandomString(10)}`,
    body: `${getRandomString(10)}`,
    url: '',
    commentText: `${getRandomString(25)}`
}

export {
    IssueData,
    issueData,
}