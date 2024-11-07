import { getRandomString } from "../../common/data/functions/randomString"

type IssueData = {
    title: string,
    description?: string,
    url: string,
    tag: string,
    commentText: string,
}

const issueData: IssueData = {
    title: `${getRandomString(10)}`,
    description: `${getRandomString(10)}`,
    url: '',
    tag: `${getRandomString(6)}`,
    commentText: `${getRandomString(25)}`
}

export {
    IssueData,
    issueData,
}