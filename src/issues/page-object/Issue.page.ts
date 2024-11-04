import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../common/page-object/PageObject'
import { IssueModel } from '../model/issue.model'

class IssuePage extends PageObject {
    protected url: string = 'https://github.com/anplatova/test-for-study/issue/'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public async clickButtonDeleteIssue(): Promise<void> {
        await this.getButtonDeleteIssue().waitForClickable({
            timeoutMsg: 'Button Delete Issue was not clickable'
        })
        await this.getButtonDeleteIssue().click()
    }

    public async clickButtonDeleteIssueApply(): Promise<void> {
        await this.getButtonDeleteIssueApply().waitForClickable({
            timeoutMsg: 'Button Delete Issue Apply was not clickable'
        })
        await this.getButtonDeleteIssueApply().click()
    }

    public async clickButtonCloseIssue(): Promise<void> {
        await this.getButtonCloseIssue().waitForClickable({
            timeoutMsg: 'Button Close Issue was not clickable'
        })
        await this.getButtonCloseIssue().click()
    }

    public async clickButtonLabels(): Promise<void> {
        await this.getButtonLabels().waitForClickable({
            timeoutMsg: 'Button Labels was not clickable'
        })
        await this.getButtonLabels().click()
    }

    public async clickButtonLockComments(): Promise<void> {
        await this.getButtonLockComments().waitForClickable({
            timeoutMsg: 'Button Lock Comments was not clickable'
        })
        await this.getButtonLockComments().click()
    }

    public async clickButtonLockCommentsApply(): Promise<void> {
        await this.getButtonLockCommentsApply().waitForClickable({
            timeoutMsg: 'Button Lock Comments Apply was not clickable'
        })
        await this.getButtonLockCommentsApply().click()
    }

    public async clickButtonNewIssue(): Promise<void> {
        await this.getButtonNewIssue().waitForClickable({
            timeoutMsg: 'Button New Issue was not clickable'
        })
        await this.getButtonNewIssue().click()
    }

    public async clickButtonSaveComment(): Promise<void> {
        await this.getButtonSaveComment().waitForClickable({
            timeoutMsg: 'Button Save Comment was not clickable'
        })
        await this.getButtonSaveComment().click()
    }

    public async clickButtonSignOut(): Promise<void> {
        await this.getButtonSignOut().waitForClickable({
            timeoutMsg: 'Button Sign Out was not clickable'
        })
        await this.getButtonSignOut().click()
    }

    public async clickButtonSubmitNewIssue(): Promise<void> {
        await this.getButtonSubmitNewIssue().waitForClickable({
            timeoutMsg: 'Button Submit New Issue was not clickable'
        })
        await this.getButtonSubmitNewIssue().click()
    }

    public async fillFieldComment(comment: string): Promise<void> {
        await this.getFieldComment().waitForDisplayed({
            timeoutMsg: 'Comment field was not displayed'
        })
        await this.getFieldComment().setValue(comment)
    }

    public async fillFieldFilterLabels(labelName: string): Promise<void> {
        await this.getFieldFilterLabels().waitForDisplayed({
            timeoutMsg: 'Field Filter Labels was not displayed'
        })
        await this.getFieldFilterLabels().setValue(labelName)
        await this.browser.pause(1000)
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

    public getAlertInvalidFileText(): Promise<string> {
        return this.getAlertInvalidFile().getText()
    }

    public getCommentFileAttribute(): Promise<string> {
        return this.getCommentFile().getAttribute('target')
    }

    public getIssueTitleText(): Promise<string> {
        return this.getIssueTitle().getText()
    }

    public getMessageClosedIssueText(): Promise<string> {
        return this.getMessageClosedIssue().getText()
    }

    public getMessageDeletedIssueText(): Promise<string> {
        return this.getMessageDeletedIssue().getText()
    }

    public getMessageLockCommentsText(): Promise<string> {
        return this.getMessageLockComments().getText()
    }

    public getSavedCommentText(): Promise<string> {
        return this.getSavedComment().getText()
    }

    public async openUserMenu(): Promise<void> {
        await this.getUserAvatar().waitForClickable({
            timeoutMsg: 'User avatar was not clickable'
        })
        await this.getUserAvatar().click()
    }

    public async openUrl(url: string): Promise<void> {
        await this.browser.url(url)
    }

    public async uploadCommentFile(filePath: string): Promise<void> {
        await this.getInputFile().waitForExist({
            timeoutMsg: 'File input field was not exist',
        })
        const file: string = await this.browser.uploadFile(filePath)
        await this.getInputFile().setValue(file)
        await this.browser.pause(2000)
    }

    private getUserAvatar(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//summary//*[contains(@class, "avatar")]')
    }


    private getAlertInvalidFile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="error bad-file"]')
    }

    private getAlertInvalidTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@role="alert"]')
    }

    private getButtonCloseIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@data-default-action-text="Close issue"]')
    }

    private getButtonDeleteIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="octicon octicon-trash"]')
    }

    private getButtonDeleteIssueApply(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@data-disable-with="Deleting issue…"]')
    }

    private getEditIssueButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@aria-label="Edit Issue title"]')
    }

    private getButtonLabels(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@data-hotkey="l"]')
    }

    private getButtonLockComments(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="octicon octicon-lock"]')
    }

    private getButtonLockCommentsApply(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="btn btn-block"]')
    }

    private getButtonNewIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@data-hotkey="c"]')
    }

    private getButtonSaveComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="btn-primary btn"]')
    }

    private getButtonSignOut(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="dropdown-item dropdown-signout"]')
    }

    private getButtonSubmitNewIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="btn-primary btn ml-2"]')
    }

    private getCommentFile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//p[@dir="auto"]//a')
    }

    private getFieldComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="new_comment_field"]')
    }

    private getFieldFilterLabels(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@aria-label="Filter labels"]')
    }

    private getFieldTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_title"]')
    }

    private getInputFile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[type="file"]')
    }

    private getIssueTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="js-issue-title markdown-title"]')
    }

    private getMessageClosedIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@title="Status: Closed"]')
    }

    private getMessageDeletedIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="blankslate-heading"]')
    }

    private getMessageLockComments(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="blankslate"]/p')
    }

    private getSavedComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//p[@dir="auto"]')
    }
}

export {
    IssuePage,
}