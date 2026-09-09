import { test, expect } from '@playwright/test';

// --- SUITE LEVEL TAGGING ---
// Everything inside this block automatically inherits the '@admin' and '@regression' tags
test.describe('Registration', { tag: ['@smoke', '@admin'] }, () => {
  test('Admin can create a new user account', async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#firstName')).toBeVisible(); 

    const firstName = page.locator('#firstName');
    const lastName = page.getByPlaceholder('Last Name');
    const email = page.getByPlaceholder('name@example.com');
    const mobile = page.getByPlaceholder('Mobile Number');
    const subjects = page.locator('#subjectsInput');
    const gender = page.locator('#gender-radio-2');
    const music = page.locator('#hobbiesWrapper').getByLabel('Music');

    await expect(firstName).toBeVisible();
    await firstName.fill('Antony');
    await expect(lastName).toBeVisible();
    await lastName.fill('password123');
    await expect(email).toBeVisible();
    await email.fill('Antony@gmail.com');
    await expect(gender).toBeVisible();
    await gender.check();
    await expect(mobile).toBeVisible();
    await mobile.fill('9588555811');
    await expect(subjects).toBeVisible();
    await subjects.fill('Antony');
    await expect(music).toBeVisible();
    await music.check();

    console.log('Running system settings test.2..');
  });
});

// --- INDIVIDUAL LEVEL TAGGING ---
test('Validate value only', { tag: '@regression' }, async ({ page }) => {
  console.log('Running a quick regression test..3.');
  const actualValue = 'Success';
  const expectedValue = 'Success1';

  expect(actualValue).toBe(expectedValue);
});