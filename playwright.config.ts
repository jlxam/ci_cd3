import { defineConfig } from '@playwright/test';

export default defineConfig({
  grep: /@smoke|@regression|@admin/,

  retries: (globalThis as any).process?.env?.CI ? 2 : 1,

  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  use: {
    headless: false,
    trace: 'on-first-retry',
  },
});