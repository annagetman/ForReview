import { test, expect } from '@playwright/test';

test.describe('Login Form Tests', () => {
  test.beforeEach(async ({ page }) => { 
    await page.goto('/login');
  });

test('Successful login and message update', async ({ page }) => {
  const usernameValid = process.env.USERNAMEValid;
  const passwordValid = process.env.PASSWORDValid;

  await page.fill('#username', usernameValid);
  await page.fill('#password', passwordValid);
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/.*secure/);
  await expect(page.locator('.flash.success')).toContainText('You logged into a secure area!');
  await expect(page.locator('.subheader')).toContainText('Welcome to the Secure Area. When you are done click logout below.');
  await expect(page.locator('h2')).toContainText('Secure Area');
});

test('Unsuccessful login with invalid credentials', async ({ page }) => {
  const usernameInValid = process.env.USERNAMEInValid;
  const passwordInValid = process.env.USERNAMEInValid;

  await page.fill('#username', usernameInValid);
  await page.fill('#password', passwordInValid);
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/.*login/);
  await expect(page.locator('.flash.error')).toContainText('Your username is invalid!');
});

test('Unsuccessful login with empty credentials', async ({ page }) => {
  await page.fill('#username', '');
  await page.fill('#password', '');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/.*login/);
  await expect(page.locator('#username')).toContainText('');
  await expect(page.locator('#password')).toContainText('');
  await expect(page.locator('.flash.error')).toContainText('Your username is invalid!');
});

test('Unsuccessful login with empty username', async ({ page }) => {
  const passwordInValid = process.env.USERNAMEInValid;

  // await page.goto('/login');
  await page.fill('#username', '');
  await page.fill('#password', passwordInValid);
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/.*login/);
  await expect(page.locator('#username')).toContainText('');
  await expect(page.locator('.flash.error')).toContainText('Your username is invalid!');
});

test('Unsuccessful login with empty password', async ({ page }) => {
  const usernameInValid = process.env.USERNAMEInValid;

  await page.fill('#username', usernameInValid);
  await page.fill('#password', '');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/.*login/);
  await expect(page.locator('#password')).toContainText('');
  await expect(page.locator('.flash.error')).toContainText('Your username is invalid!');    
  });
});