## EximBank QA Automation Project

TypeScript test automation using **Cucumber** + **Playwright** for UI and API flows.

---

## 1. Quick Start

From the project root:

```bash
npm install
npx playwright install
```

Run tests:

```bash
# all tests
npm test

# only UI (@ui)
npm run test:ui

# only API (@api)
npm run test:api
```

Generate HTML/JSON report (in `reports/`):

```bash
npm run report
```

---

## 2. Project Structure (short)

```text
features/
  ui/ecommerce.feature        # login, cart, checkout, address
  api/employees.feature       # API scenarios

src/
  pages/                      # Playwright page objects
    LoginPage.ts
    ShopPage.ts
    CartPage.ts
    CheckoutPage.ts
  steps/                      # Cucumber steps
    ui_steps.ts
    api_steps.ts
  support/                    # Cucumber + Playwright glue
    custom-world.ts
    hooks.ts

cucumber.js                   # Cucumber config
package.json                  # scripts & deps
```

---

## 3. Main UI Flows

- **@login** – valid/invalid login, assert shop or error message.
- **@shop** – add iPhone (2 units) and Huawei (3 units), verify quantities and cart total.
- **@checkout** – positive checkout and negative cases with missing required fields.
- **@address_format** – verify address string format `Street, City - Country`
  (e.g. `BangNa, Bangkok - Thailand`).

---

## 4. Useful Notes

- Playwright browser settings are in `src/support/hooks.ts`
  (`headless`, `slowMo`).
- If you see a Playwright “install browsers” error, run:

```bash
npx playwright install
```
