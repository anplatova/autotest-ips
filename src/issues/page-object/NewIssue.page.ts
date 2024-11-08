import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from "../../common/page-object/PageObject"
import { IssueModel } from "../model/issue.model"


class NewIssuePage extends PageObject {
    protected url: string = 'https://github.com/anplatova/test-for-study/issues/new'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public async createNewIssue(issue: IssueModel): Promise<void> {
        await this.browser.url(this.url)
        await this.fillFieldTitle(issue.title)
        await this.clickButtonSubmitNewIssue()
    }

    public async clickButtonSubmitNewIssue(): Promise<void> {
        await this.getButtonSubmitNewIssue().waitForClickable({
            timeoutMsg: 'Button Submit New Issue was not clickable'
        })
        await this.getButtonSubmitNewIssue().click()
    }

    public async fillFieldTitle(title: string): Promise<void> {
        await this.getFieldTitle().waitForDisplayed({
            timeoutMsg: 'Title field was not displayed'
        })
        await this.getFieldTitle().setValue(title)
    }

    public async getAlertInvalidTitleText(): Promise<boolean> {
        await this.getAlertInvalidTitle().waitForDisplayed({
            timeoutMsg: 'Alert Invalid Title was not displayed'
        })
        return (await this.getAlertInvalidTitle()).isDisplayed()
    }

    public async getIssueTitleText(): Promise<string> {
        await this.getIssueTitle().waitForDisplayed({
            timeoutMsg: 'Title was not displayed'
        })
        return this.getIssueTitle().getText()
    }

    public async openUrl(url: string): Promise<void> {
        await this.browser.url(url)
    }

    private getAlertInvalidTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@role="alert"]')
    }

    private getButtonSubmitNewIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="btn-primary btn ml-2"]')
    }

    private getFieldTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_title"]')
    }

    private getIssueTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="js-issue-title markdown-title"]')
    }

}

export {
    NewIssuePage,
}