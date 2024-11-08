import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from './PageObject'
import { auth } from '../credential'

class ProfilePage extends PageObject {
    protected url: string = 'https://github.com/settings/profile'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public async clickEmailSelect(): Promise<void> {
        await this.getEmailSelect().waitForClickable({
            timeoutMsg: 'Email Select was not clickable'
        })
        await this.getEmailSelect().click()
    }

    public async clickEmailSelectValue(): Promise<void> {
        await this.getEmailSelectValue().waitForDisplayed({
            timeoutMsg: 'Email select value was not displayd'
        })
        await this.getEmailSelectValue().click()
    }

    public async clickPronounsSelect(): Promise<void> {
        await this.getPronounsSelect().waitForClickable({
            timeoutMsg: 'Pronouns Select was not clickable'
        })
        await this.getPronounsSelect().click()
    }

    public async clickPronounsSelectValue(): Promise<void> {
        await this.getPronounsSelectValue().waitForDisplayed({
            timeoutMsg: 'Pronouns Select value was not displayd'
        })
        await this.getPronounsSelectValue().click()
    }

    public async fillFieldBio(bio: string): Promise<void> {
        await this.getFieldBio().waitForDisplayed({
            timeoutMsg: 'Field Bio was not displayed'
        })
        await this.getFieldBio().setValue(bio)
    }

    public async fillFieldName(name: string): Promise<void> {
        await this.getFieldName().waitForDisplayed({
            timeoutMsg: 'Field Name was not displayed'
        })
        await this.getFieldName().setValue(name)
    }

    public async getAlertBadFileText(): Promise<string> {
        await this.getAlertBadFile().waitForDisplayed({
            timeoutMsg: 'Alert bad file was not displayed'
        })
        return await this.getAlertBadFile().getText()
    }

    public async getAlertGoodFileText(): Promise<string> {
        await this.getAlertFile().waitForDisplayed({
            timeoutMsg: 'Alert bad file was not displayed'
        })
        return await this.getAlertFile().getText()
    }

    public async getButtonSaveAvatar(): Promise<void> {
        await this.saveAvatar().waitForClickable({
            timeoutMsg: 'Avatar save button was not clickable'
        })
        await this.saveAvatar().click()
    }

    public saveAvatarImagePath(): Promise<string> {
        this.getAvatarImage().waitForDisplayed({
            timeoutMsg: 'Avatar was not displayed'
        })
        return this.getAvatarImage().getAttribute("src")
    }

    public async uploadFile(filePath: string): Promise<void> {
        await this.getInputFile().waitForExist({
            timeoutMsg: 'File input field was not existed',
        })
        await this.showHiddenFileInput(this.browser)
        const file: string = await this.browser.uploadFile(filePath)
        await this.getInputFile().setValue(file)
    }

    public async saveChanges(): Promise<void> {
        await this.getButtonUpdate().waitForClickable({
            timeoutMsg: 'Update button was not clickable'
        })
        await this.getButtonUpdate().click()
    }

    private getAlertBadFile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="upload-state color-fg-danger bad-file"]')
    }

    private getAlertFile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="flash flash-full flash-notice  "]')
    }

    private getAvatarImage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="avatar-upload"]//img')
    }

    private getButtonUpdate(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@data-target="waiting-form.submit"]')
    }

    private saveAvatar(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@value="save"]')
    }

    private getEmailSelect(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_email"]')
    }

    private getEmailSelectValue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$(`//*[@id="user_profile_email"]//option[@value = "${auth.email}"]`)
    }

    private getFieldBio(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_bio"]')
    }

    private getFieldName(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_name"]')
    }

    private getInputFile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[type="file"]')
    }

    private getPronounsSelect(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_pronouns_select"]')
    }

    private getPronounsSelectValue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_pronouns_select"]/option[@value = "she/her"]')
    }

    private async showHiddenFileInput(browser: WebdriverIO.Browser): Promise<void> {
        await browser.execute(() => {
            const htmlElement = document.querySelector('[type="file"]') as HTMLElement
            htmlElement.style.cssText = 'display:block !important; opacity: 1; position: inherit;'
        })
    }
}



export {
    ProfilePage,
}