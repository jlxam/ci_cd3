import { defineConfig } from '@playwright/test';

// TypeScript ನಲ್ಲಿ 'process' ಎರರ್ ಬರದಂತೆ ತಡೆಯಲು ಜಾಗತಿಕವಾಗಿ ಡಿಕ್ಲೇರ್ ಮಾಡಲಾಗಿದೆ
const env = (globalThis as any).process?.env || {};

export default defineConfig({
  grep: /@smoke|@regression|@admin/,

  /* CI ನಲ್ಲಿ 2 ಬಾರಿ, ಲೋಕಲ್ ಕಂಪ್ಯೂಟರ್‌ನಲ್ಲಿ 1 ಬಾರಿ ರಿಟ್ರೈ ಮಾಡುತ್ತದೆ */
  retries: env.CI ? 2 : 1,

  testDir: './tests',
  fullyParallel: true,
  
  reporter: [
    [
      '@testdino/playwright', 
      { token: env.TESTDINO_API_KEY ?? env.TESTDINO_TOKEN }
    ],
    ['html'],
  ],
  
  use: {
    headless: false,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    // ಪ್ಲೇರೈಟ್‌ನ ಹೊಸ ಆವೃತ್ತಿಗಳಲ್ಲಿ ಇವುಗಳನ್ನು ನೇರವಾಗಿ trace ವಿಂಡೋದಲ್ಲಿ ಹ್ಯಾಂಡಲ್ ಮಾಡಲಾಗುತ್ತದೆ
    // ಆದರೂ ನಿಮ್ಮ ಟ್ರೇಸ್ ಸೆಟ್ಟಿಂಗ್ಸ್ ಕ್ಲೀನ್ ಆಗಿ ಇರಲು ಹೀಗೆ ಸಂರಕ್ಷಿಸಲಾಗಿದೆ:
  },
});