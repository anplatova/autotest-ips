import { AxiosResponse } from 'axios'
import { createIssueModel, IssueModel } from '../model/issue.model'
import { CreateIssueResponse, GetIssueResponse, IssueAPIService, IssueInfo } from '../api/IssueAPIService'
import { auth, authCommentator, token } from '../../../credential'
import { IssueAPIProvider } from '../api/IssueAPIProvider'
import { CreateIssueData, IssueAPIDataProvider } from '../api/IssueAPIDataProvider'
import { getRandomString } from '../../common/data/functions/randomString'

describe('', () => {
    const issue: IssueModel = createIssueModel({title: getRandomString(5), body: getRandomString(10) })

    it.only('1 код ответа 201, задача должна быть создана', async () => {
        const data: CreateIssueData = IssueAPIDataProvider.getIssueData(issue)
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(auth.login, auth.repo, data)
        issue.url = response.data.html_url
        //проверить все поля response, добавить expect(response.data.)
        expect(response.status).toEqual(201)
        expect(response.data.title).toEqual(issue.title)
        expect(response.data.body).toEqual(issue.body)

        const issueList: GetIssueResponse = await IssueAPIService.getIssues(auth.login, auth.repo)
        const createdIssue: IssueInfo | undefined = issueList.find(item => item.html_url === issue.url)
        expect(createdIssue).toBeDefined()
    })

    it('2 код ответа 410, отключено создание задач в репозитории', async () => {
        const data: CreateIssueData = IssueAPIDataProvider.getIssueData(issue)
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider({ isSuccesfulResponce: false })
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(authCommentator.login, authCommentator.repo, data)

        expect(response.status).toEqual(410)
    })

    it('3 код ответа 400, передача неверного body', async () => {
        const response: Response = await fetch(
            `https://api.github.com/repos/${auth.login}/${auth.repo}/issues`,
            {
                method: 'POST',
                body: '{text:"jhg"}',
                headers: {
                    'Accept': 'application/vnd.github+json',
                    'Authorization': `Bearer ${token}`,
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })
        expect(response.status).toEqual(400)
    })

    it('4 код ответа 422, передача пустого заголовка для issue', async () => {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider({ isSuccesfulResponce: false })
        const response: AxiosResponse = await issueAPIProvider.createIssue(auth.login, auth.repo, { title: '' })

        expect(response.status).toEqual(422)
    })
})