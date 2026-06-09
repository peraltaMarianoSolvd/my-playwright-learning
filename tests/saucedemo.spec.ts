import { test, expect, type Page } from '@playwright/test';

const usernameInput = '[data-test="username"]';
const passwordInput = '[data-test="password"]';
const loginButton = '[data-test="login-button"]';
const errorMessage = '[data-test="error"]';
const cartBadge = '.shopping_cart_badge';

async function attemptLogin(
	page: Page,
	username: string,
	password: string,
) {
	if (username !== '') {
		await page.locator(usernameInput).fill(username);
	}

	if (password !== '') {
		await page.locator(passwordInput).fill(password);
	}

	await page.locator(loginButton).click();
}

async function getCartItemCount(page: Page): Promise<number> {
	const badge = page.locator(cartBadge);
	if (await badge.count() === 0) {
		return 0;
	}

	const badgeText = await badge.first().innerText();
	return Number.parseInt(badgeText, 10);
}

test.describe('SauceDemo', () => {
	test.describe('login', () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('');
		});

		test('valid login', async ({ page }) => {
			await attemptLogin(page, 'standard_user', 'secret_sauce');

			await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
			await expect(page.getByText('Products')).toBeVisible();
		});

		test('invalid login shows username required', async ({ page }) => {
			await attemptLogin(page, '', 'secret_sauce');

			await expect(page.locator(errorMessage)).toContainText('Epic sadface: Username is required');
		});

		test('invalid login shows password required', async ({ page }) => {
			await attemptLogin(page, 'standard_user', '');

			await expect(page.locator(errorMessage)).toContainText('Epic sadface: Password is required');
		});

		test('invalid login shows username/password mismatch', async ({ page }) => {
			await attemptLogin(page, 'standard_user', 'false');

			await expect(page.locator(errorMessage)).toContainText(
				'Epic sadface: Username and password do not match any user in this service',
			);
		});
	});

	test.describe('cart', () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('');
			await attemptLogin(page, 'standard_user', 'secret_sauce');
			await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
		});

		test('adding backpack increments cart badge by 1', async ({ page }) => {
			const initialCartCount = await getCartItemCount(page);

			await page.locator('#add-to-cart-sauce-labs-backpack').click();
			const updatedCartCount = await getCartItemCount(page);

			expect(
				updatedCartCount,
				'Cart count should increase by 1 after adding a product',
			).toBe(initialCartCount + 1);
		});

		test('removing backpack decrements cart badge by 1', async ({ page }) => {
			await page.locator('#add-to-cart-sauce-labs-backpack').click();
			const initialCartCount = await getCartItemCount(page);

			await page.locator('#remove-sauce-labs-backpack').click();
			const updatedCartCount = await getCartItemCount(page);

			expect(
				updatedCartCount,
				'Cart count should decrease by 1 after removing a product',
			).toBe(initialCartCount - 1);
		});
	});
});
