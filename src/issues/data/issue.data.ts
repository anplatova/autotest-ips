import { getRandomString } from "../../common/data/functions/randomString"
import { LabelModel } from "../model/label.model"

type IssueData = {
    title: string,
    description?: string,
    url: string,
    commentText: string,
    label?: LabelModel,
}

const issueData: IssueData = {
    title: `${getRandomString(10)}`,
    description: `${getRandomString(10)}`,
    url: '',
    commentText: `${getRandomString(25)}`
}

export {
    IssueData,
    issueData,
}