import { test, expect } from '@playwright/test';
import { WidgetPage } from "./widget.page";

test.describe('Uchi.ru widget ', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000); 
    widgetPage = new WidgetPage(page);

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('._UCHI_COOKIE__button').first().click();
  });

  test('opens', async () => {
    // ИСПРАВЛЕНО: Ждем кнопку от корня страницы
    await widgetPage.getOpenButtonLocator().waitFor({ state: 'visible' });
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible();
  });

  test('has correct title', async () => {
    await widgetPage.getOpenButtonLocator().waitFor({ state: 'visible' });
    await widgetPage.openWidget();

    const firstArticleSelector = '[class^=popularTitle__] + ul[class^=articles__] > li';
    await expect(widgetPage.wrapper().locator(firstArticleSelector).first()).toBeVisible();

    const articles = await widgetPage.getPopularArticles();
    // ИСПРАВЛЕНО: Клик по первому элементу массива локаторов
    await articles[0].click(); 

    await widgetPage.clickWriteToUs();
    await expect(widgetPage.getTitleLocator()).toHaveText('Связь с поддержкой');
  });

  test('can navigate back to the main list', async () => {
    await widgetPage.getOpenButtonLocator().waitFor({ state: 'visible' });
    await widgetPage.openWidget();

    const firstArticleSelector = '[class^=popularTitle__] + ul[class^=articles__] > li';
    await expect(widgetPage.wrapper().locator(firstArticleSelector).first()).toBeVisible();

    const articles = await widgetPage.getPopularArticles();
    // ИСПРАВЛЕНО: Добавлен индекс [0] для клика по массиву локаторов
    await articles[0].click(); 

    await expect(widgetPage.wrapper().locator('[data-test="button_feedback_form"]')).toBeVisible();

    await widgetPage.clickBack();
    await expect(widgetPage.getPopularTitleLocator()).toBeVisible();
  });
});