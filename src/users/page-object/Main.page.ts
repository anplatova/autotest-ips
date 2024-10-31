import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from './PageObject'
import isDisplayed from 'webdriverio/build/commands/element/isDisplayed'

class MainPage extends PageObject {
    protected url: string = 'https://github.com/anplatova'

    public isDisplayedUserLogin(): Promise<boolean> {
        return this.getUserLogin().isDisplayed()
    }

    private getUserLogin(): ChainablePromiseElement<WebdriverIO.Element> {
        return browser.$('//*[@data-login="anplatova"] | //form[@action="/session/verified-device"]')
    }
}


export {
    MainPage
}