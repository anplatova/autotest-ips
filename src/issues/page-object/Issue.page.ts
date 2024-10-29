import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from './PageObject'

class IssuePage extends PageObject {
    protected url: string = 'https://github.com/anplatova/test-for-study/issues'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }


}