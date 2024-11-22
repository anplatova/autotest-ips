import { getRandomString } from '../../common/data/functions/randomString'
import { IssuePage } from '../page-object/Issue.page'
import { IssuesPage } from '../page-object/Issues.page'
import { issueData } from '../data/issue.data'
import { IssueModel, createIssueModel } from '../model/issue.model'
import { LoginPage } from '../../common/user/page-object/Login.page'
import { LabelsPage } from '../page-object/Labels.page'
import { NewIssuePage } from '../page-object/NewIssue.page'
import { commenterData, userData } from '../../common/user/data/user.data'
import { UserModel, createUserModel } from '../../common/user/model/user.model'
import { IMAGE_PATH, PATH_INVALID_FILE } from '../../common/data/image.data'
import { createLabelModel, LabelModel } from '../model/label.model'

describe('Issues test', () => {
    let loginPage: LoginPage
    let issuesPage: IssuesPage
    let issuePage: IssuePage
    let newIssuePage: NewIssuePage
    let labelsPage: LabelsPage
    const user: UserModel = createUserModel(userData)
    const commentator: UserModel = createUserModel(commenterData)
    const label: LabelModel = createLabelModel({ name: getRandomString(6) })
    const issue: IssueModel = createIssueModel(issueData)
    const fileName: string = 'picture_png'

    const issueWithToLongTitle: IssueModel = createIssueModel(issueData)
    issueWithToLongTitle.title = getRandomString(1025)

    const issueWithValidTitle: IssueModel = createIssueModel(issueData)
    issueWithValidTitle.title = getRandomString(10)

    const issueTitleAfterEdit: IssueModel = createIssueModel(issueData)

    const issueWithLabel: IssueModel = createIssueModel(issueData)
    issueWithLabel.labels = label

    before(async () => {
        loginPage = new LoginPage(browser)
        issuesPage = new IssuesPage(browser)
        issuePage = new IssuePage(browser)
        newIssuePage = new NewIssuePage(browser)
        labelsPage = new LabelsPage(browser)
        await loginPage.login(user)
    })

    it('1 Создание задачи с допустимым количеством символов в названии', async () => {
        await newIssuePage.createNewIssue(issueWithValidTitle)

        const displayedTitleIssue: string = await issuePage.getIssueTitleText()

        expect(displayedTitleIssue).toEqual(issueWithValidTitle.title)
    })

    it('2 Создание задачи с не допустимым количеством символов в названии', async () => {
        await newIssuePage.createNewIssue(issueWithToLongTitle)

        expect(await newIssuePage.getAlertInvalidTitleText()).toEqual(true)
    })

    it('3 Редактирование названия созданной задачи', async () => {
        await newIssuePage.createNewIssue(issueTitleAfterEdit)

        issueTitleAfterEdit.title = getRandomString(40)
        await issuePage.editIssueTitle(issueTitleAfterEdit)

        const displayedNewTitleIssue: string = await issuePage.getIssueTitleText()

        expect(displayedNewTitleIssue).toEqual(issueTitleAfterEdit.title)
    })

    it('4 Добавление файла допустимого формата в задачу', async () => {
        await newIssuePage.createNewIssue(issue, IMAGE_PATH)

        expect(await issuePage.getAttachFileName(fileName)).toEqual(true)
    })

    it('5 Ошибка при добавлении файла недопустимого формата', async () => {
        await newIssuePage.createNewIssueWithInvalidFile(issue, PATH_INVALID_FILE)

        expect(await issuePage.getAlertInvalidFileText()).toEqual(true)
    })

    describe('Проверка возможности комментирования', () => {
        it('6 Возможность оставлять комментарии к задаче, если они включены', async () => {
            await newIssuePage.createNewIssue(issue)
            issue.url = await browser.getUrl()

            await browser.reloadSession()

            await loginPage.login(commentator)
            await browser.url(issue.url)

            await issuePage.fillFieldComment(issue.commentText)
            await issuePage.clickButtonSaveComment()

            expect(await issuePage.getSavedCommentText()).toEqual(issue.commentText)
        })

        it('7 Блокировка комментирования задачи', async () => {
            await newIssuePage.createNewIssue(issue)

            await issuePage.lockConversation()
            issue.url = await browser.getUrl()

            await browser.reloadSession()

            await loginPage.login(commentator)

            await browser.url(issue.url)

            expect(await issuePage.isDisplayedLockConversationText()).toEqual(true)
        })

        afterEach(async () => {
            await browser.reloadSession()
            await loginPage.login(user)
        })
    })

    it('8 Закрытие задачи', async () => {
        await newIssuePage.createNewIssue(issue)
        await issuePage.submitButtonCloseIssue()

        expect(await issuePage.displayedClosedIssueText()).toEqual(true)
    })

    it('9 Поиск задачи по тегу', async () => {
        await labelsPage.createNewLabel(label)
        await newIssuePage.createNewIssue(issueWithLabel)

        await issuePage.submitButtonLabels()
        await issuePage.fillFieldFilterLabels(label)
        await issuePage.submitButtonLabels()
        await labelsPage.open()
        await labelsPage.fillFieldSearchAllLabels(label)
        await labelsPage.openIssueByLabel(label)

        expect(await labelsPage.getButtonIssueFindByLabelText()).toEqual(issueWithLabel.title)
    })

    it('10 Удаление задачи', async () => {
        await newIssuePage.createNewIssue(issue)
        issue.url = await browser.getUrl()
        await issuePage.deleteIssue()
        await browser.url(issue.url)

        expect(await issuePage.displayedDeletedIssueText()).toEqual(true)
    })
})