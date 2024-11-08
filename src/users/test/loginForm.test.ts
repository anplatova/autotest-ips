import { LoginPage } from "../page-object/Login.page"
import { MainPage } from "../page-object/Main.page"
import { userData } from '../data/user.data'
import { UserModel, createUserModel } from '../model/user.model'
import { auth } from "../../../credential"

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

    it.only('Логинация с логином', async () => {
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

    // it('reset password form', async () => {
    //     const isDisplayedElement: boolean = await loginPage.isDisplayedForgotPasswordForm()
    //     //доделать
    //     await browser.$('//*[@id="login"]').waitForDisplayed({
    //         timeoutMsg: 'Login form was not displayd',
    //     })
    //     await browser.$('//*[@id="forgot-password"]').waitForClickable({
    //         timeoutMsg: 'forgot password link was not clickable',
    //     })
    //     await browser.$('//*[@id="forgot-password"]').click()

    //     expect(await browser.$('//*[@id="forgot_password_form"]').isDisplayed())
    // })

    afterEach(async () => {
        await browser.reloadSession()
    })

})