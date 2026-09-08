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
    // CI-ல் இயங்கும்போது True ஆகவும், லோக்கலில் இயங்கும்போது False (Headed) ஆகவும் மாறும்
    headless: isCI,
    
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
     /* 🌟 ADD THESE NETWORK & USER AGENT RULES TO FIX BLANK PAGES 🌟 */
    ignoreHTTPSErrors: true, // Prevents self-signed or test certificate blocks from halting page load
    
    // Disguises the automated runner as a standard consumer desktop browser
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',

    launchOptions: isCI ? {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-blink-features=AutomationControlled', // Hides the "automated webdriver" flag from application security layers
      ],
    } : undefined,
  },
});