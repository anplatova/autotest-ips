import { commentLogin, commentPassword } from '../../../credential'
import { LoginPage } from '../../users/page-object/Login.page'
import { IssuePage } from '../page-object/Issue.page'
import { LabelsPage } from '../page-object/labels.page'
import { userData } from '../../users/data/user.data'
import { UserModel, createUserModel } from '../../users/model/user.model'
import { issueData } from '../data/issue.data'
import { IssueModel, createIssueModel } from '../model/issue.model'

describe('Issues test', async () => {
    let loginPage: LoginPage
    let issuesPage: IssuePage
    let labelsPage: LabelsPage
    const user: UserModel = createUserModel(userData)
    const issue: IssueModel = createIssueModel(issueData)
    const invalidTitle: string = '123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 12345'
    const invalidFile: string = 'src/files/exe_git-bash.exe'

    before(async () => {
        loginPage = new LoginPage(browser)
        issuesPage = new IssuePage(browser)
        labelsPage = new LabelsPage(browser)
        await loginPage.login(user)
    })

    beforeEach(async () => {
        await issuesPage.open()
    })

    it('1 Создание задачи с допустимым количеством символов в названии', async () => {
        await issuesPage.clickButtonNewIssue()
        await issuesPage.fillFieldTitle(issue.title)
        await issuesPage.clickButtonSubmitNewIssue()

        expect(await issuesPage.getIssueTitleText()).toEqual(issue.title)
    })

    it('2 Создание задачи с не допустимым количеством символов в названии', async () => {
        await issuesPage.clickButtonNewIssue()
        await issuesPage.fillFieldTitle(invalidTitle)
        await issuesPage.clickButtonSubmitNewIssue()

        expect(await issuesPage.getAlertInvalidTitleText()).toEqual('There was an error creating your Issue: title is too long (maximum is 256 characters).')
    })

    // it ('3 Редактирование названия созданной задачи', async () => {

    // })

    it('4 Добавление файла допустимого формата в задачу', async () => {
        await issuesPage.clickButtonNewIssue()
        await issuesPage.fillFieldTitle(issue.title)
        await issuesPage.uploadCommentFile(issue.commentFilePath)
        await issuesPage.clickButtonSubmitNewIssue()

        expect(await issuesPage.getCommentFileAttribute()).toEqual('_blank')
    })

    it('5 Ошибка при добавлении файла недопустимого формата', async () => {
        await issuesPage.clickButtonNewIssue()
        await issuesPage.uploadCommentFile(invalidFile)

        expect(await issuesPage.getAlertInvalidFileText()).toEqual('We don’t support that file type. Try again with a GIF, JPEG, JPG, MOV, MP4, PNG, SVG, WEBM, CSV, DOCX, FODG, FODP, FODS, FODT, GZ, LOG, MD, ODF, ODG, ODP, ODS, ODT, PATCH, PDF, PPTX, TGZ, TXT, XLS, XLSX or ZIP.')
    })

    it('6 Возможность оставлять комментарии к задаче, если они включены', async () => {
        await issuesPage.clickButtonNewIssue()
        await issuesPage.fillFieldTitle(issue.title)
        await issuesPage.clickButtonSubmitNewIssue()
        issue.url = await browser.getUrl()
        await issuesPage.openUserMenu()
        await issuesPage.clickButtonSignOut()
        await loginPage.open()
        await loginPage.loginComment()
        await browser.url(issue.url)
        await issuesPage.fillFieldComment(issue.commentText)
        await issuesPage.clickButtonSaveComment()

        expect(await issuesPage.getSavedCommentText()).toEqual(issue.commentText)
        await issuesPage.openUserMenu()
        await issuesPage.clickButtonSignOut()
        await loginPage.open()
        await loginPage.login(user)
    })

    it('7 Блокировка комментирования задачи', async () => {
        await issuesPage.clickButtonNewIssue()
        await issuesPage.fillFieldTitle(issue.title)
        await issuesPage.clickButtonSubmitNewIssue()
        await issuesPage.clickButtonLockComments()
        await issuesPage.clickButtonLockCommentsApply()
        issue.url = await browser.getUrl()
        await issuesPage.openUserMenu()
        await issuesPage.clickButtonSignOut()
        await loginPage.open()
        await loginPage.loginComment()
        await browser.url(issue.url)

        expect(await issuesPage.getMessageLockCommentsText()).toEqual('This conversation has been locked and limited to collaborators.')
        await issuesPage.openUserMenu()
        await issuesPage.clickButtonSignOut()
        await loginPage.open()
        await loginPage.login(user)
    })

    it('8 Закрытие задачи', async () => {
        await issuesPage.clickButtonNewIssue()
        await issuesPage.fillFieldTitle(issue.title)
        await issuesPage.clickButtonSubmitNewIssue()
        await issuesPage.clickButtonCloseIssue()

        expect(await issuesPage.getMessageClosedIssueText()).toEqual('Closed')
    })

    it('9 Поиск задачи по тегу', async () => {
        await labelsPage.open()
        await labelsPage.clickButtonNewLabel()
        await labelsPage.fillFieldLabelName(issue.tag)
        await labelsPage.clickButtonCreateLabel()
        await issuesPage.open()
        await issuesPage.clickButtonNewIssue()
        await issuesPage.fillFieldTitle(issue.tag)
        await issuesPage.clickButtonSubmitNewIssue()
        await issuesPage.clickButtonLabels()
        await issuesPage.fillFieldFilterLabels(issue.tag)
        await browser.keys('Enter')
        await issuesPage.clickButtonLabels()
        await labelsPage.open()
        await labelsPage.fillFieldSearchAllLabels(issue.tag)
        await browser.keys('Enter')
        await labelsPage.clickButtonLabelByFilter()

        expect(await labelsPage.getButtonIssueFindByLabelText()).toEqual(issue.tag)
    })

    it('10 Удаление задачи', async () => {
        await issuesPage.clickButtonNewIssue()
        await issuesPage.fillFieldTitle(issue.title)
        await issuesPage.clickButtonSubmitNewIssue()
        issue.url = await browser.getUrl()
        await issuesPage.clickButtonDeleteIssue()
        await issuesPage.clickButtonDeleteIssueApply()
        await browser.url(issue.url)

        expect(await issuesPage.getMessageDeletedIssueText()).toEqual('This issue has been deleted.')
    })

    after(async () => {
        await browser.reloadSession()
    })
})