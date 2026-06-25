import { test, expect } from '@playwright/test';

// --- SUITE LEVEL TAGGING ---
// Everything inside this block automatically inherits the '@admin' and '@regression' tags
test.describe('Admin Dashboard', { tag: ['@smoke', '@admin'] }, () => {
  
  test('Admin can create a new user account', async ({ page }) => {
     
    console.log('Running inside smoke test 1...');
  });

  test('Zdmin can update system settings',{ tag: '@admin' }, async ({ page }) => {
    // This test also inherits @admin and @regression
    console.log('Running system settings test.2..');
  });
});

// --- INDIVIDUAL LEVEL TAGGING ---
// This test stands alone and only runs during regression testing spikes
test('User can successfully log in', { tag: '@regression' }, async ({ page }) => {
 
  console.log('Running a quick regression test..3.');
});