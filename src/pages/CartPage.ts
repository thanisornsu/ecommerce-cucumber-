import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    readonly totalCost: Locator;
    readonly cartItems: Locator;

    constructor(page: Page) {
        super(page);
        this.totalCost = page.locator('.cart-total-price');
        this.cartItems = page.locator('.cart-items .cart-row');
    }

    async getTotalCost() {
        const text = await this.totalCost.textContent();
        return parseFloat(text?.replace('$', '') || '0');
    }

    async getCartItems() {
        const items = [];
        const count = await this.cartItems.count();

        for (let i = 0; i < count; i++) {
            const item = this.cartItems.nth(i);
            const name = await item.locator('.cart-item-title').textContent();
            const priceText = await item.locator('.cart-price').textContent();
            const quantityText = await item.locator('.cart-quantity-input').inputValue();

            items.push({
                name: name?.trim() || '',
                price: parseFloat(priceText?.replace('$', '') || '0'),
                quantity: parseInt(quantityText || '0')
            });
        }

        return items;
    }

    calculateExpectedTotal(items: Array<{ name: string, price: number, quantity: number }>) {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    async setItemQuantity(productName: string, quantity: number) {
        const item = this.page.locator('.cart-row', {
            has: this.page.locator('.cart-item-title', { hasText: productName })
        });
        const qtyInput = item.locator('.cart-quantity-input');

        await qtyInput.fill(quantity.toString());
        await qtyInput.press('Enter');
    }
}
