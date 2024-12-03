import { Result } from "wdio-image-comparison-service"
import { auth } from "../../../credential"
import { IMAGE_PATH, IMAGE_50x50_PATH, IMAGE_1920x1080_PATH, } from "../../common/data/image.data"
import { userData } from "../../common/user/data/user.data"
import { createUserModel, UserModel } from "../../common/user/model/user.model"
import { LoginPage } from "../../common/user/page-object/Login.page"
import { CreateIssueResponse, IssueAPIService } from "../api/IssueAPIService"
import { createIssueModel, IssueModel } from "../model/issue.model"
import { IssuePage } from "../page-object/Issue.page"

describe('Issue Screenshot test', () => {
    const issue: IssueModel = createIssueModel({ title: 'issue', commentText: '' })
    let issuePage: IssuePage
    const images: string[] = [IMAGE_PATH, IMAGE_50x50_PATH, IMAGE_1920x1080_PATH]

    before(async () => {
        let loginPage: LoginPage = new LoginPage(browser)
        const user: UserModel = createUserModel(userData)
        await loginPage.login(user)

    })

    beforeEach(async () => {
        const responseData: CreateIssueResponse = await IssueAPIService.createIssue(auth.login, auth.repo, issue)
        issue.url = responseData.html_url
        issue.number = responseData.number

        issuePage = new IssuePage(browser, issue.url)
    })

    for (let i = 0; i < images.length; i++) {
        it('добавление картинки в комментарий', async () => {
            await issuePage.open()
            await issuePage.createComment(images[i])
            const result: Result = await browser.checkFullPageScreen(`image in comment ${i}`)
            expect(result).not.toBeGreaterThan(0.05)
        })
    }

    afterEach(async () => {
        await issuePage.deleteIssue()
    })
})