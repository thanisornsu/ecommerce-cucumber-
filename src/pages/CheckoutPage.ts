import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    readonly phoneInput: Locator;
    readonly streetInput: Locator;
    readonly cityInput: Locator;
    readonly countrySelect: Locator;
    readonly submitOrderButton: Locator;
    readonly successMessage: Locator;
    readonly addressDisplay: Locator;

    constructor(page: Page) {
        super(page);
        this.phoneInput = page.locator('#phone');
        this.streetInput = page.locator('input[name="street"]');
        this.cityInput = page.locator('input[name="city"]');
        this.countrySelect = page.locator('#countries_dropdown_menu');
        this.submitOrderButton = page.locator('#submitOrderBtn');
        this.successMessage = page.locator('#message');
        this.addressDisplay = page.locator('#message');
    }

    async fillDetails(details: { phone?: string, street?: string, city?: string, country?: string }) {
        if (details.phone !== undefined) {
            await this.phoneInput.fill(details.phone);
        }
        if (details.street !== undefined) {
            await this.streetInput.fill(details.street);
        }
        if (details.city !== undefined) {
            await this.cityInput.fill(details.city);
        }
        if (details.country !== undefined && details.country !== '') {
            await this.countrySelect.selectOption(details.country);
        }
    }

    async submitOrder() {
        await this.submitOrderButton.click();
    }

    async getSuccessMessage() {
        return await this.successMessage.textContent();
    }

    async getAddressDisplay() {
        return await this.addressDisplay.textContent();
    }
}
