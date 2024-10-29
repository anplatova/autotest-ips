import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from './PageObject'

class LoginPage extends PageObject {
    protected url: string = 'https://github.com/login'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    private getLoginForm(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="login"]')
    }

    private getLoginField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="login_field"]')
    }

    private getPasswordField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="password"]')
    }

    private getSubmitButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@type="submit"]')
    }

    private getErrorMessage(): ChainablePromiseElement<WebdriverIO.Element> {
        return browser.$('//*[@id="js-flash-container"]')
    }

    private getForgotPasswordLink(): ChainablePromiseElement<WebdriverIO.Element> {
        return browser.$('//*[@id="forgot-password"]')
    }

    private getForgotPasswordForm(): ChainablePromiseElement<WebdriverIO.Element> {
        return browser.$('//*[@id="forgot_password_form"]')
    }

    public isDisplayedError(): Promise<boolean> {
        return this.getErrorMessage().isDisplayed()
    }

    public isDisplayedForgotPasswordForm(): Promise<boolean> {
        return this.getForgotPasswordForm().isDisplayed()
    }

    public async openForgotPasswordForm(): Promise<void> {
        await this.getForgotPasswordLink().waitForClickable({
            timeoutMsg: 'forgot password link was not clickable',
        })
        await this.getForgotPasswordLink().click()
    }

    public isDisplayedLoginForm(): Promise<boolean> {
        return this.getLoginForm().isDisplayed()
    }

    public async setLogin(login: string): Promise<void> {
        await this.getLoginField().waitForDisplayed({
            timeoutMsg: 'Email input was not displayd',
        })
        await this.getLoginField().setValue(login)
    }

    public async setPassword(password: string): Promise<void> {
        await this.getPasswordField().waitForDisplayed({
            timeoutMsg: 'Password input was not displayd',
        })
        await this.getPasswordField().setValue(password)
    }

    public async submit(): Promise<void> {
        await this.getSubmitButton().waitForClickable({
            timeoutMsg: 'Submit button was not clicabled',
        })
        await this.getSubmitButton().click()
    }

    public async waitForDisplaydLoginForm(): Promise<void> {
        await this.getLoginForm().waitForDisplayed({
            timeoutMsg: 'Login form was not displayd',
        })
    }

    public async login(auth: { login: string, password: string, email: string }): Promise<void> {
        await this.waitForDisplaydLoginForm()
        await this.setLogin(auth.login)
        await this.setPassword(auth.password)
        await this.submit()
    }

    public async loginWithEmail(auth: { login: string, password: string, email: string }): Promise<void> {
        await this.waitForDisplaydLoginForm()
        await this.setLogin(auth.email)
        await this.setPassword(auth.password)
        await this.submit()
    }

}

export {
    LoginPage
}