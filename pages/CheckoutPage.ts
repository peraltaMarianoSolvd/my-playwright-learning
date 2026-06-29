import { Locator, Page } from "@playwright/test";
export class CheckoutPage {
    readonly page: Page;
    readonly checkoutButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator
    readonly postalCodeInput: Locator;
    readonly finishButton: Locator;
    readonly completeHeader: Locator;
    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator("#continue");
        this.firstNameInput = page.locator("#first-name");
        this.lastNameInput = page.locator("#last-name");
        this.postalCodeInput = page.locator("#postal-code");
        this.finishButton = page.locator("#finish");
        this.completeHeader = page.locator(".complete-header");
    }
}