import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#submitLoginBtn');
        this.errorMessage = page.locator('#loginSection #message');
    }

    async navigate() {
        await this.navigateTo('https://qa-practice.razvanvancea.ro/auth_ecommerce.html');
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage() {
        // Wait for error message if expected
        return await this.errorMessage.textContent();
    }
}
