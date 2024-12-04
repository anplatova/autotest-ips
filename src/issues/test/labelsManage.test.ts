import { auth } from "../../../credential"
import { userData } from "../../common/user/data/user.data"
import { UserModel, createUserModel } from "../../common/user/model/user.model"
import { LoginPage } from "../../common/user/page-object/Login.page"
import { CreateIssueResponse, IssueAPIService } from "../api/IssueAPIService"
import { createIssueModel, IssueModel } from "../model/issue.model"
import { createLabelModel, LabelModel } from "../model/label.model"
import { IssuePage } from "../page-object/Issue.page"
import { LabelsPage } from "../page-object/labels.page"

describe('Label Manage Test', () => {
    const labelForUI: LabelModel = createLabelModel()
    const label: LabelModel = createLabelModel()
    const issue: IssueModel = createIssueModel()
    const issueWithLabel: IssueModel = createIssueModel()
    let issuePage: IssuePage
    let issueWithLabelPage: IssuePage
    let labelsPage: LabelsPage

    before(async () => {
        labelsPage = new LabelsPage(browser)
        let loginPage: LoginPage = new LoginPage(browser)
        const user: UserModel = createUserModel(userData)
        await loginPage.login(user)

        let responseData: CreateIssueResponse
        responseData = await IssueAPIService.createIssue(auth.login, auth.repo, issue)
        issue.url = responseData.html_url
        
        responseData = await IssueAPIService.createIssue(auth.login, auth.repo, issueWithLabel)
        issueWithLabel.url = responseData.html_url
        issueWithLabel.number = responseData.number

        issuePage = new IssuePage(browser, issue.url)
        issueWithLabelPage = new IssuePage(browser, issueWithLabel.url)
        await IssueAPIService.createLabel(auth.login, auth.repo, labelForUI)
        await IssueAPIService.createLabel(auth.login, auth.repo, label)
        
        await IssueAPIService.addLabelsToAnIssue(auth.login, auth.repo, issueWithLabel.number!, [label])
    })

    it('добавление label к issue', async () => {
        await issuePage.open()
        await issuePage.manageLabelInIssue(labelForUI)
        await labelsPage.open()
        await labelsPage.searchIssue(labelForUI)

        expect(await labelsPage.singleDisplayedElementText()).toEqual(issue.title)
    })

    it('удаление label у issue', async () => {
        await issueWithLabelPage.open()
        await issuePage.manageLabelInIssue(label)
        await labelsPage.open()
        await labelsPage.searchIssue(label)

        expect(await labelsPage.noMatchingLabels()).toEqual(true)
    })

    after(async () => {
        await IssueAPIService.deleteLabel(auth.login, auth.repo, label)
        await IssueAPIService.deleteLabel(auth.login, auth.repo, labelForUI)
    })
})