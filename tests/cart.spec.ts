import { expect, test } from "@playwright/test";
import { CartPage } from "../pages/CartPage";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";
import { secretSaucePassword, standardUser } from "../test-data/users";

test.describe("cart", () => {
	test.beforeEach(async ({ page }) => {
		const loginPage = new LoginPage(page);
		const inventoryPage = new InventoryPage(page);

		await loginPage.open();
		await loginPage.login(standardUser, secretSaucePassword);
		await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

		await inventoryPage.addBackpackButton.click();
		await inventoryPage.cartButton.click();
		await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
	});

	test("shows the added backpack in cart", async ({ page }) => {
		const cartPage = new CartPage(page);
		await expect(cartPage.itemNameLocator.first()).toHaveText("Sauce Labs Backpack");
	});
    test("correct badge number is shown in cart", async ({ page }) => {
        const cartPage = new CartPage(page);
        const inventoryPage = new InventoryPage(page);
        await expect(cartPage.cartItems).toHaveCount(1);
        await cartPage.backToInventoryButton.click();
        await inventoryPage.addBikeLightButton.click();
        await inventoryPage.cartButton.click();
        await expect(cartPage.cartItems).toHaveCount(2);
        await cartPage.removeBackpackButton.click();
        await expect(cartPage.cartItems).toHaveCount(1);

    });
    // made to fail on purpose, i consider this to be a defect on the application.
    test("checkout button disabled with empty cart", async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.removeBackpackButton.click();
        await expect(cartPage.checkoutButton).toBeDisabled();
    });
});



