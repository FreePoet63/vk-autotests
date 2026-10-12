import { test, expect } from '@playwright/test';
import { WidgetPage } from "./widget.page";

test.describe('Uchi.ru widget ', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    widgetPage = new WidgetPage(page);

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Баннер cookies может не появиться — не даём тесту зависнуть
    await page
      .locator('._UCHI_COOKIE__button')
      .first()
      .click({ timeout: 20000 })
      .catch(() => {});
  });

  test('opens', async () => {
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible();
  });

  test('has correct title', async () => {
    await widgetPage.openWidget();

    await expect(widgetPage.getPopularArticles().first()).toBeVisible();
    await widgetPage.getPopularArticles().first().click();

    await widgetPage.clickWriteToUs();
    await expect(widgetPage.getTitleLocator()).toHaveText('Связь с поддержкой');
  });

  test('can navigate back to the main list', async () => {
    await widgetPage.openWidget();

    await expect(widgetPage.getPopularArticles().first()).toBeVisible();
    await widgetPage.getPopularArticles().first().click();

    await expect(widgetPage.wrapper().locator('[data-test="button_feedback_form"]')).toBeVisible();

    await widgetPage.clickBack();
    await expect(widgetPage.getPopularTitleLocator()).toBeVisible();
  });
});