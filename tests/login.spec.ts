import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import {
	lockedOutUser,
	secretSaucePassword,
	standardUser,
} from "../test-data/users";

test.describe("login", () => {
	test.beforeEach(async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.open();
	});

	test("valid login", async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.login(standardUser, secretSaucePassword);

		await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
		await expect(page.getByText("Products")).toBeVisible();
	});

	test("invalid login shows username required", async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.login("", secretSaucePassword);

		await expect(loginPage.errorMessage).toContainText(
			"Epic sadface: Username is required",
		);
	});

	test("invalid login shows password required", async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.login(standardUser, "");

		await expect(loginPage.errorMessage).toContainText(
			"Epic sadface: Password is required",
		);
	});

	test("invalid login shows username/password mismatch", async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.login(standardUser, "false");

		await expect(loginPage.errorMessage).toContainText(
			"Epic sadface: Username and password do not match any user in this service",
		);
	});

	test("locked", async ({ page }) => {
		const loginPage = new LoginPage(page);
		await loginPage.login(lockedOutUser, secretSaucePassword);

		await expect(loginPage.errorMessage).toContainText(
			"Epic sadface: Sorry, this user has been locked out.",
		);
	});
});
