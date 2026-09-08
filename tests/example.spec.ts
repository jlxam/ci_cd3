import { test, expect } from '@playwright/test';

// --- SUITE LEVEL TAGGING ---
// Everything inside this block automatically inherits the '@admin' and '@regression' tags
test.describe('Admin Dashboard', { tag: ['@smoke', '@admin'] }, () => {
  
  test('Admin can create a new user account', async ({ page }) => {
     
    console.log('Running inside smoke test 1...');
  });

  test('Zdmin can update system settings',{ tag: '@admin' }, async ({ page }) => {
    // This test also inherits @admin and @regression 
    await page.goto('https://demoqa.com/automation-practice-form')
    await page.locator(`#firstName`).fill('Antony');
    await page.getByPlaceholder('Last Name').fill('password123');
    await page.getByPlaceholder('name@example.com').fill('Antony@gmail.com');
    const element = page.locator('#gender-radio-2');
    await element.click();
    await page.getByPlaceholder("Mobile Number").fill('9588555811');
    await page.getByPlaceholder('Last Name').fill('password123');
    await page.locator('#subjectsInput').fill('Antony');
    //const element1 = page.getByLabel('Sports')
    //const element1 =page.locator('#hobbies-checkbox-2')
    const element1 = page.locator('#hobbiesWrapper').getByLabel('Music')
    await element1.click();
    console.log('Running system settings test.2..');
  });
});

// --- INDIVIDUAL LEVEL TAGGING ---
// This test stands alone and only runs during regression testing spikes
test('User can successfully log in', { tag: '@regression' }, async ({ page }) => {
 
  console.log('Running a quick regression test..3.');
  const actualValue = "Success";
const expectedValue = "Success";

// Passes if they match exactly
expect(actualValue).toBe(expectedValue);
});