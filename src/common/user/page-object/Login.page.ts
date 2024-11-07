import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../page-object/PageObject'
import { UserModel } from '../model/user.model'

class LoginPage extends PageObject {
    protected url: string = 'https://github.com/login'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
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

    public async login(user: UserModel): Promise<void> {
        await this.browser.url(this.url)
        await this.waitForDisplaydLoginForm()
        await this.setLogin(user.login)
        await this.setPassword(user.password)
        await this.submit()
    }

    public async loginWithLogin(user: UserModel): Promise<void> {
        await this.waitForDisplaydLoginForm()
        await this.setLogin(user.login)
        await this.setPassword(user.password)
        await this.submit()
    }

    public async loginWithEmail(user: UserModel): Promise<void> {
        await this.waitForDisplaydLoginForm()
        await this.setLogin(user.email)
        await this.setPassword(user.password)
        await this.submit()
    }

    public async loginComment(user: UserModel): Promise<void> {
        await this.browser.url(this.url)
        await this.waitForDisplaydLoginForm()
        await this.setLogin(user.commentLogin)
        await this.setPassword(user.commentPassword)
        await this.submit()
    }

    public isDisplayedError(): Promise<boolean> {
        return this.getErrorMessage().isDisplayed()
    }

    public isDisplayedForgotPasswordForm(): Promise<boolean> {
        return this.getForgotPasswordForm().isDisplayed()
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


}

export {
    LoginPage,
}