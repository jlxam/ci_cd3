import { defineConfig } from '@playwright/test';

export default defineConfig({
  grep: /@smoke|@regression|@admin/,

  retries: (globalThis as any).process?.env?.CI ? 2 : 1,

  testDir: './tests',
  fullyParallel: true,
  reporter: [
    ['@testdino/playwright', { token: process.env.TESTDINO_API_KEY ?? process.env.TESTDINO_TOKEN }],
    ['html'],
  ],
  use: {
    headless: false,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
});