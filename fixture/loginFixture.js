import { test as base } from "@playwright/test";

export const test = base.extend({
  logedIn: async ({ page }, use) => {
    await page.goto("https://the-internet.herokuapp.com/tables");
    await page.waitForURL("https://the-internet.herokuapp.com/tables");
    // HAND CONTROL TO TEST
    await use(page);
  },
});
export { expect } from "@playwright/test";
