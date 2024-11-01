import { getRandomString } from "../../common/data/functions/randomString"

type IssueData = {
    title: string,
    longTitle: string,
    description?: string,
    url: string,
    tag: string,
}

const issueData: IssueData = {
    title: `${getRandomString(10)}`,
    longTitle: `${getRandomString(1025)}`,
    description: `${getRandomString(10)}`,
    url: '',
    tag: `${getRandomString(6)}`
}

export {
    IssueData,
    issueData,
}