import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from "../../common/page-object/PageObject"
import { IssueModel } from "../model/issue.model"
import { UploadFile } from '../../page-object/UploadFile'
import { Reporter } from '../../common/reporter/Reporter'



class NewIssuePage extends PageObject {
    protected url: string = 'https://github.com/anplatova/test-for-study/issues/new'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public async createNewIssue(issue: IssueModel, filePath?: string): Promise<void> {
       Reporter.addStep('Создание нового issue')
        await this.browser.url(this.url)
        await this.fillFieldTitle(issue.title)
        if (filePath) {
            await this.uploadFile(filePath)
            await this.browser.pause(2000)
        }
        await this.submitNewIssue()
    }

    public async createNewIssueWithInvalidFile(issue: IssueModel, filePath?: string): Promise<void> {
        Reporter.addStep('Создание нового issue с невалидным файлом')
        await this.browser.url(this.url)
        await this.fillFieldTitle(issue.title)
        if (filePath) {
            await this.uploadFile(filePath)
            await this.browser.pause(2000)
        }
    }

    public async submitNewIssue(): Promise<void> {
        Reporter.addStep('Сохрание созданного issue')
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
        Reporter.addStep('Получение сообщения об ошибке о невалидном файле, прикрепляемом к задаче')
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

    public async uploadFile(filePath: string): Promise<void> {
        await this.getInputFile().waitForExist({
            timeoutMsg: 'File input field was not existed',
        })
        await this.showHiddenFileInput(this.browser)
        const file: string = await this.browser.uploadFile(filePath)
        await this.getInputFile().setValue(file)
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

    private getInputFile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[type="file"]')
    }

    private async showHiddenFileInput(browser: WebdriverIO.Browser): Promise<void> {
        await browser.execute(() => {
            const htmlElement = document.querySelector('[type="file"]') as HTMLElement
            htmlElement.style.cssText = 'display:block !important; opacity: 1; position: inherit;'
        })
    }
}

export {
    NewIssuePage,
}