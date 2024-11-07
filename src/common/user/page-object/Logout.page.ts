import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../page-object/PageObject'

class LogoutPage extends PageObject {
    protected url: string = 'https://github.com/logout'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public async logOutUser(): Promise<void> {
        await this.browser.url(this.url)
        await this.clickButtonSignOut()
    }

    public async clickButtonSignOut(): Promise<void> {
        await this.getButtonSignOut().waitForClickable({
            timeoutMsg: 'Button Sign Out was not clickable'
        })
        await this.getButtonSignOut().click()
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    private getButtonSignOut(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@data-disable-with="Sign out"]')
    }

}

export {
    LogoutPage
}
