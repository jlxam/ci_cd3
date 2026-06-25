import { defineConfig } from '@playwright/test';

export default defineConfig({
  // --- SET DEFAULT TAGS HERE ---
  // This tells Playwright to run any tests tagged with @smoke, @regression, OR @admin by default
  grep: /@smoke|@regression|@admin/,

  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  use: {
    headless: true,
  },
});