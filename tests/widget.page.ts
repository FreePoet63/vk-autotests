import { Page, Locator } from "@playwright/test";

const WidgetPageSelectors = {
    WRAPPER: '.sc-dino-typography-h > [class^=widget__]',
    WIDGET_BODY: '[class^=widgetWrapper] > [class^=widget__]',
    HEADER_TEXT: 'header h5',
    BUTTON_OPEN: '[data-test=openWidget]',
    BUTTON_WRITE_TO_US: '[data-test="button_feedback_form"]', 
    ARTICLE_POPULAR_TITLE: '[class^=popularTitle__]',
    ARTICLE_POPULAR_LIST: '[class^=popularTitle__] + ul[class^=articles__]',
    ARTICLE_POPULAR_LIST_ITEM: '[class^=popularTitle__] + ul[class^=articles__] > li',
    BUTTON_BACK: 'header [class^=btnBack__], header button:has(svg)'
} as const;

export class WidgetPage {
    static selector = WidgetPageSelectors;

    constructor(protected page: Page) {}

    wrapper(): Locator {
        return this.page.locator(WidgetPage.selector.WRAPPER);
    }

    // ИСПРАВЛЕНО: Кнопка открытия ищется от корня страницы (this.page)
    getOpenButtonLocator(): Locator {
        return this.page.locator(WidgetPage.selector.BUTTON_OPEN);
    }

    async openWidget(): Promise<void> {
        await this.getOpenButtonLocator().click();
    }

    async getPopularArticles(): Promise<Locator[]> {
        return this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM).all();
    }

    async clickWriteToUs(): Promise<void> {
        await this.wrapper().locator(WidgetPage.selector.BUTTON_WRITE_TO_US).click();
    }

    async clickBack(): Promise<void> {
        await this.wrapper().locator(WidgetPage.selector.BUTTON_BACK).first().click();
    }

    getTitleLocator(): Locator {
        return this.wrapper().locator(WidgetPage.selector.HEADER_TEXT);
    }

    getPopularTitleLocator(): Locator {
        return this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_TITLE);
    }

    getWidgetBody(): Locator {
        return this.page.locator(WidgetPage.selector.WIDGET_BODY);
    }
}