import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        // Local run may be a bit slow to load external site, so:
        // - wait only for DOMContentLoaded (ไม่ต้องรอ asset ทุกตัว)
        // - เพิ่ม timeout เป็น 60s ให้เผื่อเน็ตช้า
        await this.page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 60_000,
        });
    }

    async wait(ms: number) {
        await this.page.waitForTimeout(ms);
    }
}
