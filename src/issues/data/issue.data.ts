import { getRandomString } from "../../common/data/functions/randomString"

type IssueData = {
    title: string,
    description?: string,
    url: string,
    tag: string,
}

const issueData: IssueData = {
    title: `${getRandomString(10)}`,
    description: `${getRandomString(10)}`,
    url: '',
    tag: `${getRandomString(6)}`
}

export {
    IssueData,
    issueData,
}