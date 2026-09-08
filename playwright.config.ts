import { defineConfig } from '@playwright/test';

// TypeScript ನಲ್ಲಿ 'process' ಎರರ್ ಬರದಂತೆ ತಡೆಯಲು ಜಾಗತಿಕವಾಗಿ ಡಿಕ್ಲೇರ್ ಮಾಡಲಾಗಿದೆ
const env = (globalThis as any).process?.env || {};

const testdinoToken = env.TESTDINO_API_KEY ?? env.TESTDINO_TOKEN;
const isCI = !!env.CI;

export default defineConfig({
  grep: /@smoke|@regression|@admin/,

  /* CI ನಲ್ಲಿ 2 ಬಾರಿ, ಲೋಕಲ್ ಕಂಪ್ಯೂಟರ್‌ನಲ್ಲಿ 1 ಬಾರಿ ರಿಟ್ರೈ ಮಾಡುತ್ತದೆ */
  retries: isCI ? 2 : 1,

  testDir: './tests',
  fullyParallel: true,

  reporter: testdinoToken
    ? [
        ['@testdino/playwright', { token: testdinoToken }],
        ['html'],
      ]
    : [['list'], ['html']],

  use: {
    headless: isCI,
    launchOptions: isCI ? { args: ['--disable-gpu', '--no-sandbox'] } : undefined,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
});