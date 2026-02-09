import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import {
  BrowserContext,
  Page,
  PlaywrightTestOptions,
  APIRequestContext,
  request,
} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ShopPage } from "../pages/ShopPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

export interface CustomWorld extends World {
  context?: BrowserContext;
  page?: Page;
  apiContext?: APIRequestContext;
  playwrightOptions?: PlaywrightTestOptions;
  loginPage?: LoginPage;
  shopPage?: ShopPage;
  cartPage?: CartPage;
  checkoutPage?: CheckoutPage;
}

export class CustomWorld extends World implements CustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }

  async init(context: BrowserContext, page: Page) {
    this.context = context;
    this.page = page;
  }

  async initApi() {
    this.apiContext = await request.newContext();
  }

  getLoginPage(): LoginPage {
    if (!this.loginPage) {
      this.loginPage = new LoginPage(this.page!);
    }
    return this.loginPage;
  }

  getShopPage(): ShopPage {
    if (!this.shopPage) {
      this.shopPage = new ShopPage(this.page!);
    }
    return this.shopPage;
  }

  getCartPage(): CartPage {
    if (!this.cartPage) {
      this.cartPage = new CartPage(this.page!);
    }
    return this.cartPage;
  }

  getCheckoutPage(): CheckoutPage {
    if (!this.checkoutPage) {
      this.checkoutPage = new CheckoutPage(this.page!);
    }
    return this.checkoutPage;
  }
}

setWorldConstructor(CustomWorld);
