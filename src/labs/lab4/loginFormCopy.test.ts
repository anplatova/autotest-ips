import { LoginPage } from "../../page-object/Login.page"
import { MainPage } from "../../page-object/Main.page"
import { auth } from "../../credential"

describe('Login form', () => {
    let loginPage: LoginPage

    before(async () => {
        loginPage = new LoginPage(browser)
    })

    beforeEach(async () => {
        await loginPage.open()
    })

    it('login with login', async () => {
        await loginPage.login(auth)

        const mainPage: MainPage = new MainPage(browser)
        const isDisplayedElement: boolean = await mainPage.isDisplayedUserLogin()

        expect(isDisplayedElement).toEqual(true)
    })

    it('login with email', async () => {
        await loginPage.loginWithEmail(auth)

        const mainPage: MainPage = new MainPage(browser)
        const isDisplayedElement: boolean = await mainPage.isDisplayedUserLogin()

        expect(isDisplayedElement).toEqual(true)
    })

    it('login with imvalid password', async () => {
        await loginPage.setLogin(auth.login)
        await loginPage.setPassword('12345Q')

        const isDisplayedElement: boolean = await loginPage.isDisplayedError()

        expect(isDisplayedElement).toEqual(true)
    })

    it('reset password form', async () => {
        const isDisplayedElement: boolean = await loginPage.isDisplayedForgotPasswordForm()
        //доделать
        await browser.$('//*[@id="login"]').waitForDisplayed({
            timeoutMsg: 'Login form was not displayd',
        })
        await browser.$('//*[@id="forgot-password"]').waitForClickable({
            timeoutMsg: 'forgot password link was not clickable',
        })
        await browser.$('//*[@id="forgot-password"]').click()

        expect(await browser.$('//*[@id="forgot_password_form"]').isDisplayed())
    })

    afterEach(async () => {
        await browser.reloadSession()
    })

})