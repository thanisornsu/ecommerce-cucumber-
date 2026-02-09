import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../src/support/custom-world";

Given("I am on the login page", async function (this: CustomWorld) {
  await this.getLoginPage().navigate();
});

When(
  "I login with {string} and {string}",
  async function (this: CustomWorld, email, password) {
    await this.getLoginPage().login(email, password);
  },
);

Then(
  "I should see the {string} or be redirected",
  async function (this: CustomWorld, expectedMessage) {
    if (expectedMessage === "Shop") {
      await expect(this.getShopPage().productList).toBeVisible();
    } else {
      const error = await this.getLoginPage().getErrorMessage();
      expect(error).toContain(expectedMessage);
    }
  },
);

Given(
  "I am logged in as {string} with password {string}",
  async function (this: CustomWorld, email, password) {
    await this.getLoginPage().navigate();
    await this.getLoginPage().login(email, password);
    await this.page!.waitForSelector(".shop-items");
  },
);

When(
  "I add {string} {int} times",
  async function (this: CustomWorld, product, quantity) {
    await this.getShopPage().addProductToCart(product, 1);
    await this.getCartPage().setItemQuantity(product, quantity);
  },
);

Then(
  "the total cost should be correct based on item prices",
  async function (this: CustomWorld) {
    await this.page!.waitForSelector('.cart-items .cart-row', { timeout: 5000 });

    const items = await this.getCartPage().getCartItems();
    expect(items.length).toBeGreaterThan(0);

    const iPhoneItem = items.find(item => 
      item.name.includes("Apple iPhone 13") && 
      item.name.includes("Blue")
    );

    const huaweiItem = items.find(item => 
      item.name.includes("Huawei Mate 20 Lite") && 
      item.name.includes("Black")
    );

    expect(iPhoneItem).toBeDefined();
    expect(iPhoneItem!.quantity).toBe(2);
    expect(huaweiItem).toBeDefined();
    expect(huaweiItem!.quantity).toBe(3);

    const expectedTotal = this.getCartPage().calculateExpectedTotal(items);
    const actualTotal = await this.getCartPage().getTotalCost();

    const tolerance = 0.01;
    const difference = Math.abs(actualTotal - expectedTotal);

    expect(difference).toBeLessThan(tolerance);
    expect(actualTotal).toBeGreaterThan(0);
  },
);

Given("I have items in my cart", async function (this: CustomWorld) {
  await this.getShopPage().addProductToCart("Apple iPhone 13, 128GB, Blue", 1);
});

Given("I proceed to checkout", async function (this: CustomWorld) {
  await this.getShopPage().proceedToCheckout();
});

When(
  "I fill the checkout form with:",
  { timeout: 30 * 1000 },
  async function (this: CustomWorld, dataTable) {
    const data = dataTable.rowsHash();
    await this.getCheckoutPage().fillDetails({
      phone: data.Phone || "",
      street: data.Street || "",
      city: data.City || "",
      country: data.Country || "",
    });
  },
);

When("I click submit order", async function (this: CustomWorld) {
  await this.getCheckoutPage().submitOrder();
});

Then(
  "I should see a success message {string}",
  async function (this: CustomWorld, message) {
    if (message === "validation_error") {
      await this.page!.waitForTimeout(500);

      const successMsg = await this.getCheckoutPage().getSuccessMessage();
      if (successMsg) {
        expect(successMsg).not.toContain("Congrats");
        expect(successMsg).not.toContain("success");
      }
      const phoneValue = await this.getCheckoutPage().phoneInput.inputValue();
      const streetValue = await this.getCheckoutPage().streetInput.inputValue();
      expect(phoneValue === "" || streetValue === "").toBe(true);
    } else {
      await this.page!.waitForTimeout(1000);
      const successMsg = await this.getCheckoutPage().getSuccessMessage();
      expect(successMsg).toContain(message);
    }
  },
);

Given("I have completed an order", async function (this: CustomWorld) {
  await this.getLoginPage().navigate();
  await this.getLoginPage().login("admin@admin.com", "admin123");

  await this.getShopPage().addProductToCart("Apple iPhone 13, 128GB, Blue", 1);
  await this.getShopPage().proceedToCheckout();

  await this.getCheckoutPage().fillDetails({
    phone: "1234567890",
    street: "123 Test St",
    city: "Test City",
    country: "United States of America",
  });
  await this.getCheckoutPage().submitOrder();
});

Then(
  "the address should be displayed in format {string}",
  async function (this: CustomWorld, expectedFormat) {
    await this.page!.waitForTimeout(1000);

    const addressText = await this.getCheckoutPage().getAddressDisplay();
    expect(addressText).toBeTruthy();

    if (addressText) {
      expect(addressText).toMatch(/.*,.*-.*/);
      expect(addressText).toContain(expectedFormat);
    }
  },
);
