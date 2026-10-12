import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',

  /* Перезапуск нестабильных тестов: 2 раза, только в CI */
  retries: process.env.CI ? 2 : 0,
  /* В CI один воркер, меньше нагрузки на сайт */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never' }], ['list']],

  /* Shared settings for all the projects below. */
  use: {
    baseURL: 'https://uchi.ru',
    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',
    /* Скриншот при падении */
    screenshot: 'only-on-failure',

    launchOptions: {
      /* slow down test run */
      //slowMo: 500,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});