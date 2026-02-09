import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { CustomWorld } from './custom-world';

let browser: Browser;

BeforeAll(async function () {
    browser = await chromium.launch({
        headless: false, // Set to true for headless execution
        slowMo: 500 // Slow down by 500ms per action for better visibility
    });
});

AfterAll(async function () {
    await browser.close();
});

Before(async function (this: CustomWorld) {
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
    await this.init(this.context, this.page);
});

Before({ tags: '@api' }, async function (this: CustomWorld) {
    await this.initApi();
});

After(async function (this: CustomWorld, scenario) {
    if (scenario.result?.status === Status.FAILED) {
        const screenshotPath = `reports/screenshots/${scenario.pickle.name.replace(/ /g, '_')}.png`;
        await this.page?.screenshot({ path: screenshotPath });
        this.attach(await this.page!.screenshot(), 'image/png');
    }
    await this.page?.close();
    await this.context?.close();
    await this.apiContext?.dispose();
});
