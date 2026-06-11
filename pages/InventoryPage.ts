import { type Locator, type Page } from "@playwright/test";

export class InventoryPage {
	readonly page: Page;
	readonly addBackpackButton: Locator;
	readonly removeBackpackButton: Locator;
	readonly addBikeLightButton: Locator;
	readonly removeBikeLightButton: Locator;
	readonly addBoltTShirtButton: Locator;
	readonly removeBoltTShirtButton: Locator;
	readonly addFleeceJacketButton: Locator;
	readonly removeFleeceJacketButton: Locator;
	readonly addOnesieButton: Locator;
	readonly removeOnesieButton: Locator;
	readonly addRedTShirtButton: Locator;
	readonly removeRedTShirtButton: Locator;
    readonly sortSelect: Locator;
    readonly inventoryItems: Locator;
    readonly productPrice: Locator;
    readonly productDescription: Locator;
    readonly productName: Locator;
	readonly cartButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.addBackpackButton = page.locator("#add-to-cart-sauce-labs-backpack");
		this.removeBackpackButton = page.locator("#remove-sauce-labs-backpack");
		this.addBikeLightButton = page.locator("#add-to-cart-sauce-labs-bike-light");
		this.removeBikeLightButton = page.locator("#remove-sauce-labs-bike-light");
		this.addBoltTShirtButton = page.locator("#add-to-cart-sauce-labs-bolt-t-shirt");
		this.removeBoltTShirtButton = page.locator("#remove-sauce-labs-bolt-t-shirt");
		this.addFleeceJacketButton = page.locator("#add-to-cart-sauce-labs-fleece-jacket");
		this.removeFleeceJacketButton = page.locator("#remove-sauce-labs-fleece-jacket");
		this.addOnesieButton = page.locator("#add-to-cart-sauce-labs-onesie");
		this.removeOnesieButton = page.locator("#remove-sauce-labs-onesie");
		this.addRedTShirtButton = page.locator("#add-to-cart-test.allthethings()-t-shirt-(red)");
		this.removeRedTShirtButton = page.locator("#remove-test.allthethings()-t-shirt-(red)");
		this.sortSelect = page.locator("select.product_sort_container");
		this.inventoryItems = page.locator(".inventory_item");
        this.productPrice = page.locator(".inventory_item_price");
        this.productDescription = page.locator(".inventory_item_desc");
        this.productName = page.locator(".inventory_item_name");
		this.cartButton = page.locator(".shopping_cart_link");
	}
}
