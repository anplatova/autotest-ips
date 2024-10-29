import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from './PageObject'

class UserPage extends PageObject {
    protected url = 'https://github.com/anplatova'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public async getBioText(): Promise<string> {
        await this.getBio().waitForDisplayed({
            timeoutMsg: 'Bio was not displayed'
        })
        return this.getBio().getText()
    }

    public async getEmailText(): Promise<string> {
        await this.getEmail().waitForDisplayed({
            timeoutMsg: 'Email was not displayed'
        })
        return this.getEmail().getText()
    }

    public async getNameText(): Promise<string> {
        await this.getName().waitForDisplayed({
            timeoutMsg: 'Name was not displayed'
        })
        return this.getName().getText()
    }

    public async getPronounsText(): Promise<string> {
        await this.getPronouns().waitForDisplayed({
            timeoutMsg: 'Pronouns was not displayed'
        })
        return this.getPronouns().getText()
    }

    public async isDisplayedBioText(): Promise<boolean> {
        return this.getBio().isDisplayed()
    }

    public async isDisplayedName(): Promise<boolean> {
        return this.getName().isDisplayed()
    }

    public async isDisplayedEmail(): Promise<boolean> {
        return this.getEmail().isDisplayed()
    }

    public async isDisplayedPronouns(): Promise<boolean> {
        return this.getPronouns().isDisplayed()
    }

    private getBio(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="p-note user-profile-bio mb-3 js-user-profile-bio f4"]')
    }

    private getEmail(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="Link--primary"]')
    }

    private getName(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@itemprop="name"]')
    }

    private getPronouns(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@itemprop="pronouns"]')
    }
}

export {
    UserPage,
}