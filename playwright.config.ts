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
     
    /* 🌟 FIX: டூப்ளிகேட் நீக்கப்பட்டு, CI மற்றும் லோக்கலுக்கு தகுந்தவாறு சீரமைக்கப்பட்டுள்ளது */
    /* These flags tell Chromium to bypass GPU dependencies and sandboxing limitations in Linux CI */
    launchOptions: isCI ? {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
      ],
    } : undefined, // லோக்கல் கம்ப்யூட்டரில் சாதாரணமாக இயங்கும்
  },
});