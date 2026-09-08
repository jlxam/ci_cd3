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
    /* 🌟 முக்கிய திருத்தம்: உங்கள் இணையதளத்தின் முகவரியை (URL) இங்கே உள்ளிடவும் */
    /* இது 'about:blank' போன்ற வெற்றுப் பக்கங்கள் பைப்லைனில் தோன்றுவதைத் தடுக்கும் */
    baseURL: env.BASE_URL ?? 'https://yourstagingapp.com', 

    // CI-ல் இயங்கும்போது True ஆகவும், லோக்கலில் இயங்கும்போது False (Headed) ஆகவும் மாறும்
    headless: isCI,
    
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
     
    /* Prevents self-signed or test certificate blocks from halting page load */
    ignoreHTTPSErrors: true, 
    
    /* Disguises the automated runner as a standard consumer desktop browser */
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',

    /* 🌟 FIX: சிண்டாக்ஸ் பிழைகள் முழுமையாகச் சரிசெய்யப்பட்டு லான்ச் ஆப்ஷன்கள் சீரமைக்கப்பட்டுள்ளன */
    launchOptions: isCI ? {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-blink-features=AutomationControlled',
      ],
    } : undefined,
  },
});