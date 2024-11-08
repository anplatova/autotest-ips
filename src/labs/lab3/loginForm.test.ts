import { auth } from "../../../credential"


describe('Login form', () => {
    beforeEach(async () => {
        await browser.url('https://github.com/login')
    })

    it('login with login', async () => {
        await browser.$('//*[@id="login"]').waitForDisplayed({
            timeoutMsg: 'Login form was not displayd',
        })
        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Email input was not displayd',
        })
        await browser.$('//*[@id="login_field"]').setValue(auth.login)
        await browser.$('//*[@id="password"]').waitForDisplayed({
            timeoutMsg: 'Password input was not displayd',
        })
        await browser.$('//*[@id="password"]').setValue(auth.password)
        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Submit button was not clicabled',
        })
        await browser.$('//*[@type="submit"]').click()

        const isDisplayedElement: boolean = await browser.$('//*[@data-login="anplatova"] | //form[@action="/session/verified-device"]').isDisplayed()

        expect(isDisplayedElement).toEqual(true)
    })

    it('login with email', async () => {
        await browser.$('//*[@id="login"]').waitForDisplayed({
            timeoutMsg: 'Login form was not displayd',
        })
        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Email input was not displayd',
        })
        await browser.$('//*[@id="login_field"]').setValue(auth.email)
        await browser.$('//*[@id="password"]').waitForDisplayed({
            timeoutMsg: 'Password input was not displayd',
        })
        await browser.$('//*[@id="password"]').setValue(auth.password)
        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Submit button was not clicabled',
        })
        await browser.$('//*[@type="submit"]').click()

        const isDisplayedElement: boolean = await browser.$('//*[@data-login="anplatova"] | //form[@action="/session/verified-device"]').isDisplayed()

        expect(isDisplayedElement).toEqual(true)
    })

    it('login with imvalid password', async () => {
        await browser.$('//*[@id="login"]').waitForDisplayed({
            timeoutMsg: 'Login form was not displayd',
        })
        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Email input was not displayd',
        })
        await browser.$('//*[@id="login_field"]').setValue(auth.email)
        await browser.$('//*[@id="password"]').waitForDisplayed({
            timeoutMsg: 'Password input was not displayd',
        })
        await browser.$('//*[@id="password"]').setValue('12345Q')
        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Submit button was not clicabled',
        })
        await browser.$('//*[@type="submit"]').click()

        expect(await browser.$('//*[@id="js-flash-container"]').isDisplayed())
    })

    it('reset password form', async () => {
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