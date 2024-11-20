import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../common/page-object/PageObject'
import { IssueModel } from '../model/issue.model'
import { LabelModel } from '../model/label.model'

class LabelsPage extends PageObject {
    protected url: string = 'https://github.com/anplatova/test-for-study/labels'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public async openIssueByLabel(label: LabelModel): Promise<void> {
        await this.getButtonLabelByFilter(label.name).waitForClickable({
            timeoutMsg: 'Button Label By Filter was not clickable'
        })
        await this.getButtonLabelByFilter(label.name).click()
    }

    public async clickButtonCreateLabel(): Promise<void> {
        await this.getButtonCreateLabel().waitForClickable({
            timeoutMsg: 'Button Create Label was not clickable'
        })
        await this.getButtonCreateLabel().click()
    }

    public async clickButtonNewLabel(): Promise<void> {
        await this.getButtonNewLabel().waitForClickable({
            timeoutMsg: 'Button New Label was not clickable'
        })
        await this.getButtonNewLabel().click()
    }

    public async createNewLabel(label: LabelModel): Promise<void> {
        await this.browser.url(this.url)
        await this.clickButtonNewLabel()
        await this.fillFieldLabelName(label)
        await this.clickButtonCreateLabel()
    }

    public async fillFieldLabelName(label: LabelModel): Promise<void> {
        await this.getFieldLabelName().waitForDisplayed({
            timeoutMsg: 'Field Label Name was not displayed'
        })
        await this.getFieldLabelName().setValue(label.name)
    }

    public async fillFieldSearchAllLabels(label: LabelModel): Promise<void> {
        await this.getFieldSearchAllLabels().waitForDisplayed({
            timeoutMsg: 'Field Search All Labels was not displayed'
        })
        await this.getFieldSearchAllLabels().setValue(label.name)
        await browser.keys(['Enter'])
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

    private getButtonLabelByFilter(labelName: string): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$(`//*[@data-name="${labelName}"]`)
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