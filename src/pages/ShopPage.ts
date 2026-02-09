import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ShopPage extends BasePage {
    readonly productList: Locator;
    readonly cartTotal: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.productList = page.locator('.shop-items');
        this.cartTotal = page.locator('.cart-total-price');
        this.checkoutButton = page.locator('.btn-purchase');
    }

    async addProductToCart(productName: string, quantity: number) {
        // Find the product item that contains the title with productName
        // We use Playwright's chaining to find the specific product card
        const product = this.page.locator('.shop-item', { has: this.page.locator('.shop-item-title', { hasText: productName }) });
        const addButton = product.locator('.shop-item-button');

        // In the real UI you add the product once, then adjust quantity in the cart.
        // So we click ADD TO CART a single time here; callers are responsible for
        // changing the quantity in the cart if they need more than 1 unit.
        await addButton.click();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}
