import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../common/page-object/PageObject'
import { getRandomString } from '../../common/data/functions/randomString'
import { IssueModel } from '../model/issue.model'
import { NewIssuePage } from './NewIssue.page'

class IssuesPage extends PageObject {
    protected url: string = 'https://github.com/anplatova/test-for-study/issues'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public async clickButtonNewIssue(): Promise<void> {
        await this.getButtonNewIssue().waitForClickable({
            timeoutMsg: 'Button New Issue was not clickable'
        })
        await this.getButtonNewIssue().click()
    }

    public async openUrl(url: string): Promise<void> {
        await this.browser.url(url)
    }

    private getButtonNewIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@data-hotkey="c"]')
    }

   
}

export {
    IssuesPage,
}
