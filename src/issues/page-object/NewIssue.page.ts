import { PageObject } from "../../common/page-object/PageObject"

class NewIssuePage extends PageObject {
    protected url: string = 'https://github.com/anplatova/test-for-study/issues/new'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }
}

export {
    NewIssuePage,
}