import { defineConfig } from '@playwright/test';


const env = (globalThis as any).process?.env || {};

const testdinoToken = env.TESTDINO_API_KEY ?? env.TESTDINO_TOKEN;
const isCI = !!env.CI;

export default defineConfig({
  grep: /@smoke|@regression|@admin/,


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

    baseURL: env.BASE_URL ?? 'https://demoqa.com/automation-practice-form', 

   
    headless: isCI,
    
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
     
    /* Prevents self-signed or test certificate blocks from halting page load */
    ignoreHTTPSErrors: true, 
    
    /* Disguises the automated runner as a standard consumer desktop browser */
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',

   
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