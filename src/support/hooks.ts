import { Before, After, BeforeAll, AfterAll, Status } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext, Page } from "@playwright/test";
import { CustomWorld } from "./custom-world";

let browser: Browser;

BeforeAll(async function () {
  const isCI = process.env.CI === "true";
  browser = await chromium.launch({
    // In CI we must run headless (no X server). Locally you still see the browser.
    headless: isCI ? true : false,
    slowMo: isCI ? 0 : 500,
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

Before({ tags: "@api" }, async function (this: CustomWorld) {
  await this.initApi();
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshotPath = `reports/screenshots/${scenario.pickle.name.replace(/ /g, "_")}.png`;
    await this.page?.screenshot({ path: screenshotPath });
    this.attach(await this.page!.screenshot(), "image/png");
  }
  await this.page?.close();
  await this.context?.close();
  await this.apiContext?.dispose();
});
