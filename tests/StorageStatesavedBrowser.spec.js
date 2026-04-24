import { test, expect } from "@playwright/test";

test.beforeAll(async ({ browser }) => {
  // Create a new context
  const context = await browser.newContext();
  const page = await context.newPage();

  // Login flow
  const email = "vijen.kamboj@gmail.com";
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("India@2911");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");

  // Save storage state
  await context.storageState({ path: "state.json" });
  await context.close();
});

// Example test that reuses state.json
test("Reuse login state", async ({ browser }) => {
  const webcontext = await browser.newContext({ storageState: "state.json" });
  const page = await webcontext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  // You’ll already be logged in here
  // You should already be logged in here
  await page.waitForSelector(".card-body");
});
