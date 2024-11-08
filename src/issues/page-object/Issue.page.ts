import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../common/page-object/PageObject'
import { IssueModel } from '../model/issue.model'

class IssuePage extends PageObject {
    protected url: string = 'https://github.com/anplatova/test-for-study/issue/'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public async getLockConversation(): Promise<void> {
        await this.clickButtonLockConversation()
        await this.clickButtonLockConversationApply()
    }

    public async clickButtonLockConversation(): Promise<void> {
        await this.getButtonLockConversation().waitForDisplayed({
            timeoutMsg: 'Button Lock Conversation was not displayd'
        })
        await this.getButtonLockConversation().click()
    }

    public async clickButtonLockConversationApply(): Promise<void> {
        await this.getButtonLockConversationApply().waitForClickable({
            timeoutMsg: 'Button Lock Comments Apply was not clickable'
        })
        await this.getButtonLockConversationApply().click()
    }

    public async clickButtonCloseIssue(): Promise<void> {
        await this.getButtonCloseIssue().waitForClickable({
            timeoutMsg: 'Button Close Issue was not clickable'
        })
        await this.getButtonCloseIssue().click()
    }

    public async clickButtonDeleteIssue(): Promise<void> {
        await this.getButtonDeleteIssue().waitForClickable({
            timeoutMsg: 'Delete Issue button was not clickable'
        })
        await this.getButtonDeleteIssue().click()
    }

    public async clickButtonDeleteIssueApply(): Promise<void> {
        await this.getButtonDeleteIssueApply().waitForClickable({
            timeoutMsg: 'Delete Issue apply button was not clickable'
        })
        await this.getButtonDeleteIssueApply().click()
    }

    public async clickButtonEditIssueTitle(): Promise<void> {
        await this.getEditIssueTitle().waitForClickable({
            timeoutMsg: 'Edite Issue Title was not clickable'
        })
        await this.getEditIssueTitle().click()
    }

    public async clickButtonLabels(): Promise<void> {
        await this.getButtonLabels().waitForClickable({
            timeoutMsg: 'Button Labels was not clickable'
        })
        await this.getButtonLabels().click()
    }

    public async clickButtonSaveLabels(): Promise<void> {
        await this.getButtonSaveLabel().waitForClickable({
            timeoutMsg: 'Button Labels was not clickable'
        })
        await this.getButtonSaveLabel().click()
    }

    public async clickButtonSubmitNewTitle(): Promise<void> {
        await this.getButtonSubmitNewTitle().waitForClickable({
            timeoutMsg: 'Button Submit New Issue was not clickable'
        })
        await this.getButtonSubmitNewTitle().click()
    }

    public async clickButtonSaveComment(): Promise<void> {
        await this.getButtonSaveComment().waitForClickable({
            timeoutMsg: 'Button Save Comment was not clickable'
        })
        await this.getButtonSaveComment().click()
    }

    public async deleteIssue(): Promise<void> {
        await this.clickButtonDeleteIssue()
        await this.clickButtonDeleteIssueApply()
    }

    public async editIssueTitle(issue: IssueModel): Promise<void> {
        await this.clickButtonEditIssueTitle()
        await this.fillFieldTitle('')
        await this.fillFieldTitle(issue.title)
        await this.clickButtonSubmitNewTitle()
    }

    public async fillFieldTitle(title: string): Promise<void> {
        await this.getFieldTitle().waitForDisplayed({
            timeoutMsg: 'Title field was not displayed'
        })
        await this.getFieldTitle().setValue(title)
    }

    public async fillFieldFilterLabels(issue: IssueModel): Promise<void> {
        await this.getFieldFilterLabels().waitForDisplayed({
            timeoutMsg: 'Field Filter Labels was not displayed'
        })
        await this.getFieldFilterLabels().setValue(issue.tag)
    }

    public async getIssueTitleText(): Promise<string> {
        await this.getIssueTitle().waitForDisplayed({
            timeoutMsg: 'Title was not displayed'
        })
        return this.getIssueTitle().getText()
    }

    public async getMessageClosedIssueText(): Promise<boolean> {
        await this.getMessageClosedIssue().waitForDisplayed({
            timeoutMsg: 'Message Closed Issue was not displayed'
        })
        return this.getMessageClosedIssue().isDisplayed()
    }

    public async getMessageDeletedIssueText(): Promise<boolean> {
        await this.getMessageDeletedIssue().waitForDisplayed({
            timeoutMsg: 'Message Closed Issue was not displayed'
        })
        return this.getMessageDeletedIssue().isDisplayed()
    }

    public async getMessageLockConversationText(): Promise<boolean> {
        await this.getMessageLockConversation().waitForDisplayed({
            timeoutMsg: 'Message Lock Conversation was not displayed'
        })
        return this.getMessageLockConversation().isDisplayed()
    }

    public async openPopupCreateNewLabel(): Promise<void> {
        await this.getOpenPopupCreateLabel().waitForClickable({
            timeoutMsg: 'Button Open Popup new label was not clickable'
        })
        await this.getOpenPopupCreateLabel().click()
    }

    public getSavedCommentText(): Promise<string> {
        return this.getSavedComment().getText()
    }

    public async fillFieldComment(comment: string): Promise<void> {
        await this.getFieldComment().waitForDisplayed({
            timeoutMsg: 'Comment field was not displayed'
        })
        await this.getFieldComment().setValue(comment)
    }

    public async openUrl(url: string): Promise<void> {
        await this.browser.url(url)
    }

    private getButtonDeleteIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="partial-discussion-sidebar"]/div[9]/details/summary')
    }

    private getButtonDeleteIssueApply(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="edit_issue"]//*[@type="submit"]')
    }

    private getButtonCloseIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="BtnGroup d-flex width-full"]//*[@type="submit"]')
    }

    private getButtonLabels(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="labels-select-menu"]//*[@role="button"]')
    }

    private getButtonLockConversation(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="discussion-sidebar-item"]//*[@role="button"]')
    }

    private getButtonLockConversationApply(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="btn btn-block"]')
    }

    private getButtonSubmitNewTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="Button--secondary Button--medium Button"]')
    }

    private getButtonSaveComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="new_comment_form"]//*[@type="submit"]')
    }

    private getButtonSaveLabel(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="labels-select-menu"]//*[@type="submit"]')
    }

    private getEditIssueTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@aria-label="Edit Issue title"]')
    }

    private getFieldTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_title"]')
    }

    private getFieldFilterLabels(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@aria-label="Filter labels"]')
    }

    private getIssueTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="js-issue-title markdown-title"]')
    }

    private getMessageDeletedIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="blankslate-heading"]')
    }

    private getMessageLockConversation(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="new_comment_form"]//*[@class="blankslate"]')
    }

    private getMessageClosedIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@title="Status: Closed"]')
    }

    private getOpenPopupCreateLabel(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="labels-select-menu"]//div[3]//summary')
    }

    private getFieldComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="new_comment_field"]')
    }

    private getSavedComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//p[@dir="auto"]')
    }
}

export {
    IssuePage,
}