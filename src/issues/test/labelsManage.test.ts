import { auth } from "../../../credential"
import { userData } from "../../common/user/data/user.data"
import { UserModel, createUserModel } from "../../common/user/model/user.model"
import { LoginPage } from "../../common/user/page-object/Login.page"
import { CreateIssueResponse, IssueAPIService } from "../api/IssueAPIService"
import { createIssueModel, IssueModel } from "../model/issue.model"
import { createLabelModel, LabelModel } from "../model/label.model"
import { IssuePage } from "../page-object/Issue.page"
import { LabelsPage } from "../page-object/Labels.page"

describe('Label Manage Test', () => {
    const label: LabelModel = createLabelModel()
    const issue: IssueModel = createIssueModel()
    let issuePage: IssuePage
    let labelsPage: LabelsPage

    before(async () => {
        labelsPage = new LabelsPage(browser)
        let loginPage: LoginPage = new LoginPage(browser)
        const user: UserModel = createUserModel(userData)
        await loginPage.login(user)

        const responseData: CreateIssueResponse = await IssueAPIService.createIssue(auth.login, auth.repo, issue)
        issue.url = responseData.html_url
        issue.number = responseData.number

        //создать отдельно 2 задачу с label

        issuePage = new IssuePage(browser, issue.url)
        await IssueAPIService.createLabel(auth.login, auth.repo, label)
    })

    it('добавление label к issue', async () => {
        await issuePage.open()
        await issuePage.submitButtonLabels()
        await issuePage.fillFieldFilterLabels(label)
        await issuePage.submitButtonLabels()
        await labelsPage.open()
        await labelsPage.fillFieldSearchAllLabels(label) //
        await labelsPage.openIssueByLabel(label) //в один метод FindIssueByLabel

        expect(await labelsPage.singleDisplayedElementText()).toEqual(issue.title)
    })

    it('удаление label у issue', async () => {
        await IssueAPIService.addLabelsToAnIssue(auth.login, auth.repo, issue.number!, [label])

        await issuePage.open()
        await issuePage.submitButtonLabels()
        await issuePage.fillFieldFilterLabels(label)
        await issuePage.submitButtonLabels()
        await labelsPage.open()
        await labelsPage.fillFieldSearchAllLabels(label)
        await labelsPage.openIssueByLabel(label)

        expect(await labelsPage.noMatchingLabels()).toEqual(true)
    })

    after(async () => {
        await IssueAPIService.deleteLabel(auth.login, auth.repo, label)
    })
})