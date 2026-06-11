import { Locator, Page } from "@playwright/test";
export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator; 
    readonly itemNameLocator: Locator;
    readonly itemPriceLocator: Locator;
    readonly itemDescriptionLocator: Locator;
    readonly backToInventoryButton: Locator;
    readonly removeBackpackButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator(".cart_item");
        this.checkoutButton = page.locator("#checkout");
        this.itemNameLocator = page.locator(".inventory_item_name") ;
        this.itemPriceLocator = page.locator(".inventory_item_price");
        this.itemDescriptionLocator = page.locator(".inventory_item_desc");
        this.backToInventoryButton = page.locator("#continue-shopping");
        this.removeBackpackButton = page.locator("#remove-sauce-labs-backpack");
    }
}