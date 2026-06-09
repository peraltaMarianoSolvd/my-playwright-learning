import { test, expect } from '@playwright/test'; // importing tools from Playwright testing library

test('has title', async ({ page }) => { // defining a test case named 'has title'
  await page.goto(''); // navigating to the configured website source

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/); // asserting that the page title contains "Swag Labs"
});

test('login form is visible', async ({ page }) => {
  await page.goto('');

  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('login fails with invalid credentials', async ({ page }) => {
  await page.goto('');

  await page.getByPlaceholder('Username').fill('invalid-user');
  await page.getByPlaceholder('Password').fill('invalid-password');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});


// POSITIVE test — checks that something IS as expected
test('page has the correct title', async ({ page }) => {
  await page.goto('');
  await expect(page).toHaveTitle(/Swag Labs/);
});

// NEGATIVE test — checks that something is NOT present.
// In QA, this is just as important as positive checks.
test('page does not contain error text', async ({ page }) => {
  await page.goto('');
  // .not.toBeVisible() = assert the element is NOT visible on the page
  await expect(page.getByText('404 Page Not Found')).not.toBeVisible();
});