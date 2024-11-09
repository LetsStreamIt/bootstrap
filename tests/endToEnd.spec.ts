import { expect } from '@playwright/test';
import { test } from './email';

let isRegistered = false;

test.describe.serial('User workflows', () => {
  test('registration', async ({ page, email }) => {
    await page.goto('http://localhost/');
    await expect(page.locator('#app')).toContainText('LetsStreamIt'); // check if the app is running
    await expect(page.getByRole('list')).toContainText('Login'); // check if the user is not logged in
    await page.getByRole('link', { name: 'Login' }).click(); // click on login
    await page.getByRole('link', { name: 'Create an account' }).click(); // click on create an account
    await page.getByPlaceholder('Username').fill('test'); // fill the form
    await page.getByPlaceholder('Email').fill(email);
    await page.getByPlaceholder('Password', { exact: true }).fill('Password1!');
    await page.getByPlaceholder('Confirm Password').fill('Password1!');
    await page.getByRole('button', { name: 'Sign Up' }).click(); // click on sign up
    await page.waitForTimeout(5000); // Wait for redirect to login
    await expect(page).toHaveURL('http://localhost/login'); // check if the user is redirected to login
    await expect(page.getByRole('heading')).toContainText('Please sign in'); // check if the user is on the login page

    isRegistered = true;
  });

  test.beforeEach(async ({ page, email }) => {
    if (isRegistered) {
      await page.goto('http://localhost/'); // go to the homepage
      await page.getByRole('link', { name: 'Login' }).click(); // click on login
      await page.getByPlaceholder('Email').fill(email); // fill the form
      await page.getByPlaceholder('Password').fill('Password1!'); 
      await page.getByRole('button', { name: 'Sign In' }).click(); // click on sign in
      await page.waitForTimeout(5000); // Wait for redirect to homepage
      await expect(page).toHaveURL('http://localhost/'); // check if the user is redirected to homepage
    }
  });

  test('login', async ({ page }) => {
    await expect(page.getByRole('button')).toContainText('Logout'); // check if the user is logged in
  });

  test('session', async ({ page }) => {
    await page.getByText('Create a Streaming Session').click(); // click on create a session
    await expect(page.locator('form')).toContainText('Create Session'); // check that the create session popup is open
    await page.getByPlaceholder('Enter Youtube Video URL').fill('https://www.youtube.com/watch?v=jNQXAC9IVRw'); // fill the form
    await page.getByText('Create Session').click(); // click on create session
    await page.getByPlaceholder('Message').fill('hello'); // send a message
    await page.getByRole('button', { name: 'Send Message' }).click(); // click on send message
  });

  test('profile', async ({ page }) => {
    await page.getByRole('link', { name: 'Profile' }).click(); // click on profile
    await page.getByLabel('Bio').fill('bio'); // fill the form
    await page.getByRole('button', { name: 'Update' }).click(); // click on update
    await expect(page.getByRole('alert')).toContainText('Profile updated successfully'); // check if the profile is updated
  });
});

