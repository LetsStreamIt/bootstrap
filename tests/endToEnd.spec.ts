import { expect } from '@playwright/test';
import { test } from './email';

let isRegistered = false;

test.describe.serial('User workflows', () => {
  test('registration', async ({ page, email }) => {
    await page.goto('http://localhost/');
    await expect(page.locator('#app')).toContainText('LetsStreamIt');
    await expect(page.getByRole('list')).toContainText('Login');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Create an account' }).click();
    await page.getByPlaceholder('Username').fill('test');
    await page.getByPlaceholder('Email').fill(email);
    await page.getByPlaceholder('Password', { exact: true }).fill('Password1!');
    await page.getByPlaceholder('Confirm Password').fill('Password1!');
    await page.getByRole('button', { name: 'Sign Up' }).click();
    await page.waitForTimeout(5000); // Wait for redirect to login
    await expect(page).toHaveURL('http://localhost/login');
    await expect(page.getByRole('heading')).toContainText('Please sign in');

    isRegistered = true;
  });

  test.beforeEach(async ({ page, email }) => {
    if (isRegistered) {
      await page.goto('http://localhost/');
      await page.getByRole('link', { name: 'Login' }).click();
      await page.getByPlaceholder('Email').fill(email);
      await page.getByPlaceholder('Password').fill('Password1!');
      await page.getByRole('button', { name: 'Sign In' }).click();
      await page.waitForTimeout(5000); // Wait for redirect to homepage
      await expect(page).toHaveURL('http://localhost/');
    }
  });

  test('login', async ({ page }) => {
    await expect(page.getByRole('button')).toContainText('Logout');
  });

  test('session', async ({ page }) => {
    await page.getByText('Create a Streaming Session').click();
    await expect(page.locator('form')).toContainText('Create Session');
    await page.getByPlaceholder('Enter Youtube Video URL').fill('https://www.youtube.com/watch?v=jNQXAC9IVRw');
    await page.getByText('Create Session').click();
    await page.locator('iframe[title="Me at the zoo"]').contentFrame().locator('video').click();
    await page.getByPlaceholder('Message').fill('hello');
    await page.getByRole('button', { name: 'Send Message' }).click();
    await page.getByRole('button', { name: '▼' }).click();
    await expect(page.locator('#app')).toContainText('Me: hello');
    await page.getByRole('link', { name: 'Home' }).click();
  });

  test('profile', async ({ page }) => {
    await page.getByRole('link', { name: 'Profile' }).click();
    await page.getByLabel('Bio').fill('bio');
    await page.getByRole('button', { name: 'Update' }).click();
    await expect(page.getByRole('alert')).toContainText('Profile updated successfully');
  });
});

