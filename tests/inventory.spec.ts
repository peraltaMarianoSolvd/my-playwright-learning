import { expect, test, type Page } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";
import { secretSaucePassword, standardUser } from "../test-data/users";

const cartBadge = ".shopping_cart_badge";

async function getCartItemCount(page: Page): Promise<number> {
	const badge = page.locator(cartBadge);
	if ((await badge.count()) === 0) {
		return 0;
	}

	const badgeText = await badge.first().innerText();
	return Number.parseInt(badgeText, 10);
}

test.describe("inventory", () => {
	test.beforeEach(async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.open();
		await loginPage.login(standardUser, secretSaucePassword);
		await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
	});

	test("adding backpack increments cart badge by 1", async ({ page }) => {
		const inventoryPage = new InventoryPage(page);
		const initialCartCount = await getCartItemCount(page);

		await inventoryPage.addBackpackButton.click();
		const updatedCartCount = await getCartItemCount(page);

		expect(
			updatedCartCount,
			"Cart count should increase by 1 after adding a product",
		).toBe(initialCartCount + 1);
	});

	test("removing backpack decrements cart badge by 1", async ({ page }) => {
		const inventoryPage = new InventoryPage(page);
		await inventoryPage.addBackpackButton.click();
		const initialCartCount = await getCartItemCount(page);

		await inventoryPage.removeBackpackButton.click();
		const updatedCartCount = await getCartItemCount(page);

		expect(
			updatedCartCount,
			"Cart count should decrease by 1 after removing a product",
		).toBe(initialCartCount - 1);
	});

	test("sort select has correct options", async ({ page }) => {
		const inventoryPage = new InventoryPage(page);
		const options = await inventoryPage.sortSelect.locator("option").allInnerTexts();

		expect(options).toEqual([
			"Name (A to Z)",
			"Name (Z to A)",
			"Price (low to high)",
			"Price (high to low)",
		]);
	});

	test('sorting by Name (Z to A) changes the first item', async ({ page }) => {
		const inventoryPage = new InventoryPage(page);
		const productNames = page.locator('.inventory_item_name');
		const initialFirstItem = await productNames.first().innerText();

		await inventoryPage.sortSelect.selectOption('za');

		const updatedFirstItem = await productNames.first().innerText();

		expect(updatedFirstItem).not.toBe(initialFirstItem);
		expect(updatedFirstItem).toBe('Test.allTheThings() T-Shirt (Red)');
	});
    test('sorting by Price (low to high) works on all items', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const productPrices = inventoryPage.productPrice;

        await inventoryPage.sortSelect.selectOption('lohi');
        const priceTexts = await productPrices.allInnerTexts();
        const prices = priceTexts.map(text => Number.parseFloat(text.replace('$', '')));
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    });
    test('sorting by Price (high to low) works on all items', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const productPrices = inventoryPage.productPrice;
        await inventoryPage.sortSelect.selectOption('hilo');
        const priceTexts = await productPrices.allInnerTexts();
        const prices = priceTexts.map(text => Number.parseFloat(text.replace('$', '')));
        const sortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sortedPrices);
    }); 
});
