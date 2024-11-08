import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../common/page-object/PageObject'
import { IssueModel } from '../model/issue.model'

class LabelsPage extends PageObject {
    protected url: string = 'https://github.com/anplatova/test-for-study/labels'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public async clickButtonCreateLabel(): Promise<void> {
        await this.getButtonCreateLabel().waitForClickable({
            timeoutMsg: 'Button Create Label was not clickable'
        })
        await this.getButtonCreateLabel().click()
    }

    public async clickButtonLabelByFilter(): Promise<void> {
        await this.getButtonLabelByFilter().waitForClickable({
            timeoutMsg: 'Button Label By Filter was not clickable'
        })
        await this.getButtonLabelByFilter().click()
    }

    public async clickButtonNewLabel(): Promise<void> {
        await this.getButtonNewLabel().waitForClickable({
            timeoutMsg: 'Button New Label was not clickable'
        })
        await this.getButtonNewLabel().click()
    }

    public async createNewLabel(issue: IssueModel): Promise<void> {
        await this.browser.url(this.url)
        await this.clickButtonNewLabel()
        await this.fillFieldLabelName(issue.tag)
        await this.clickButtonCreateLabel()
    }

    public async fillFieldLabelName(labelName: string): Promise<void> {
        await this.getFieldLabelName().waitForDisplayed({
            timeoutMsg: 'Field Label Name was not displayed'
        })
        await this.getFieldLabelName().setValue(labelName)
    }

    public async fillFieldSearchAllLabels(labelName: string): Promise<void> {
        await this.getFieldSearchAllLabels().waitForDisplayed({
            timeoutMsg: 'Field Search All Labels was not displayed'
        })
        await this.getFieldSearchAllLabels().setValue(labelName)
    }

    public getButtonIssueFindByLabelText(): Promise<string> {
        return this.getButtonIssueFindByLabel().getText()
    }

    public getMessageNoMatchingLabelsText(): Promise<string> {
        return this.getMessageNoMatchingLabels().getText()
    }

    public async openUrl(url: string): Promise<void> {
        await this.browser.url(url)
    }

    private getButtonCreateLabel(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(text(), "Create label")]')
    }

    private getButtonIssueFindByLabel(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@data-hovercard-type="issue"]')
    }

    private getButtonLabelByFilter(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="col-md-3 col-9"]')
    }

    private getButtonNewLabel(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="position-relative d-md-block d-none"]/button')
    }

    private getFieldLabelName(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="label-name-"]')
    }

    private getFieldSearchAllLabels(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="js-issues-search"]')
    }

    private getMessageNoMatchingLabels(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="blankslate-heading"]')
    }
}

export {
    LabelsPage,
}