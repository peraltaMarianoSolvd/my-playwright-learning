import { expect, test } from "@playwright/test";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";
import { secretSaucePassword, standardUser } from "../test-data/users";

test.describe("checkout", () => {
	test("user can input first name, last name, and postal code", async ({ page }) => {
		const loginPage = new LoginPage(page);
		const inventoryPage = new InventoryPage(page);
		const cartPage = new CartPage(page);
		const checkoutPage = new CheckoutPage(page);

		await test.step("Login", async () => {
			await loginPage.open();
			await loginPage.login(standardUser, secretSaucePassword);
			await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
		});

		await test.step("Add an item in inventory", async () => {
			await inventoryPage.addBackpackButton.click();
			await expect(inventoryPage.removeBackpackButton).toBeVisible();
		});

		await test.step("Go to cart", async () => {
			await inventoryPage.cartButton.click();
			await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
		});

		await test.step("Go to checkout", async () => {
			await cartPage.checkoutButton.click();
			await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
		});

		await test.step("Fill checkout info", async () => {
			await checkoutPage.firstNameInput.fill("Lionel");
			await checkoutPage.lastNameInput.fill("Messi");
			await checkoutPage.postalCodeInput.fill("2026");

			await expect(checkoutPage.firstNameInput).toHaveValue("Lionel");
			await expect(checkoutPage.lastNameInput).toHaveValue("Messi");
			await expect(checkoutPage.postalCodeInput).toHaveValue("2026");
		});
        await test.step("Finish checkout", async () => {
            await checkoutPage.checkoutButton.click();
            await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
            await checkoutPage.finishButton.click();
            await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
            await expect(checkoutPage.completeHeader).toHaveText("Thank you for your order!");
        });
	});
});
