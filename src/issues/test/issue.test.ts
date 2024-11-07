import { getRandomString } from '../../common/data/functions/randomString'
import { IssuePage } from '../page-object/Issue.page'
import { IssuesPage } from '../page-object/Issues.page'
import { issueData } from '../data/issue.data'
import { IssueModel, createIssueModel } from '../model/issue.model'
import { LoginPage } from '../../common/user/page-object/Login.page'
import { LogoutPage } from '../../common/user/page-object/Logout.page'
import { LabelsPage } from '../page-object/Labels.page'
import { NewIssuePage } from '../page-object/NewIssue.page'
import { userData } from '../../common/user/data/user.data'
import { UserModel, createUserModel } from '../../common/user/model/user.model'

describe('Issues test', () => {
    let loginPage: LoginPage
    let issuesPage: IssuesPage
    let issuePage: IssuePage
    let newIssuePage: NewIssuePage
    let labelsPage: LabelsPage
    let logoutPage: LogoutPage
    const user: UserModel = createUserModel(userData)
    const issue: IssueModel = createIssueModel(issueData)

    const issueWithToLongTitle: IssueModel = createIssueModel(issueData)
    issueWithToLongTitle.title = getRandomString(1025)

    const issueWithValidTitle: IssueModel = createIssueModel(issueData)
    issueWithValidTitle.title = getRandomString(10)

    const issueTitleAfterEdite: IssueModel = createIssueModel(issueData)
    issueTitleAfterEdite.title = getRandomString(40)

    before(async () => {
        loginPage = new LoginPage(browser)
        issuesPage = new IssuesPage(browser)
        issuePage = new IssuePage(browser)
        newIssuePage = new NewIssuePage(browser)
        labelsPage = new LabelsPage(browser)
        logoutPage = new LogoutPage(browser)
        await loginPage.login(user)
    })

    beforeEach(async () => {
        await issuesPage.open()
    })

    it('1 Создание задачи с допустимым количеством символов в названии', async () => {
        await issuesPage.clickButtonNewIssue()
        await newIssuePage.createNewIssue(issueWithValidTitle)

        const displayedTitleIssue: string = await issuePage.getIssueTitleText()

        expect(displayedTitleIssue).toEqual(issueWithValidTitle.title)
    })

    it('2 Создание задачи с не допустимым количеством символов в названии', async () => {
        await issuesPage.clickButtonNewIssue()
        await newIssuePage.createNewIssue(issueWithToLongTitle)

        expect(await newIssuePage.getAlertInvalidTitleText()).toEqual(true)
    })

    it('3 Редактирование названия созданной задачи', async () => {
        await issuesPage.clickButtonNewIssue()
        await newIssuePage.createNewIssue(issueTitleAfterEdite)

        issueTitleAfterEdite.title = getRandomString(40)
        await issuePage.editIssueTitle(issueTitleAfterEdite)

        const displayedNewTitleIssue: string = await issuePage.getIssueTitleText()

        expect(displayedNewTitleIssue).toEqual(issueTitleAfterEdite.title)

    })

    // it('4 Добавление файла допустимого формата в задачу', async () => {
    // })

    // it('5 Ошибка при добавлении файла недопустимого формата', async () => {
    // })

    it('6 Возможность оставлять комментарии к задаче, если они включены', async () => {
        await issuesPage.clickButtonNewIssue()
        await newIssuePage.createNewIssue(issue)
        issue.url = await browser.getUrl()

        await logoutPage.logOutUser()

        await loginPage.loginComment(user)
        await browser.url(issue.url)

        await issuePage.fillFieldComment(issue.commentText)
        await issuePage.clickButtonSaveComment()

        expect(await issuePage.getSavedCommentText()).toEqual(issue.commentText)

        await logoutPage.logOutUser()
        await loginPage.login(user)
    })

    it('7 Блокировка комментирования задачи', async () => {
        await issuesPage.clickButtonNewIssue()
        await newIssuePage.createNewIssue(issue)

        await issuePage.getLockConversation()
        issue.url = await browser.getUrl()

        await logoutPage.logOutUser()

        await loginPage.loginComment(user)

        await browser.url(issue.url)

        expect(await issuePage.getMessageLockConversationText()).toEqual(true)

        await logoutPage.logOutUser()
        await loginPage.login(user)
    })

    it.only('8 Закрытие задачи', async () => {
        await issuesPage.clickButtonNewIssue()
        await newIssuePage.createNewIssue(issue)
        await issuePage.clickButtonCloseIssue()

        expect(await issuePage.getMessageClosedIssueText()).toEqual(true)
    })

    // it('9 Поиск задачи по тегу', async () => {
    //   
    // })

    // it('10 Удаление задачи', async () => {
    //   
    // })

    after(async () => {
        await browser.reloadSession()
    })
})