import { LoginPage } from "../page-object/Login.page"
import { MainPage } from "../page-object/Main.page"
import { userData } from '../data/user.data'
import { UserModel, createUserModel } from '../model/user.model'

describe('Login form', () => {
    let loginPage: LoginPage
    let mainPage: MainPage
    const user: UserModel = createUserModel(userData)

    before(async () => {
        loginPage = new LoginPage(browser)
        mainPage = new MainPage(browser)
    })

    beforeEach(async () => {
        await loginPage.open()
    })

    it('Логинация с логином', async () => {
        await loginPage.loginWithLogin(user)

        await mainPage.open()
        const isDisplayedElement: boolean = await mainPage.isDisplayedUserLogin()

        expect(isDisplayedElement).toEqual(true)
    })

    it('Логинация с email', async () => {
        await loginPage.loginWithEmail(user)

        await mainPage.open()
        const isDisplayedElement: boolean = await mainPage.isDisplayedUserLogin()

        expect(isDisplayedElement).toEqual(true)
    })

    it('Логинация с невалидным паролем', async () => {
        await loginPage.setLogin(user.login)
        await loginPage.setPassword('12345Q')

        const isDisplayedElement: boolean = await loginPage.isDisplayedError()

        expect(isDisplayedElement).toEqual(true)
    })

    afterEach(async () => {
        await browser.reloadSession()
    })
})