// URL: https://javascript.info/alert-prompt-confirm
// This site has live interactive alert examples
import { test, expect } from "@playwright/test";
test("handle alert on javascript.info", async ({ page }) => {
  await page.goto("https://javascript.info/alert-prompt-confirm");

  // register dialog handler BEFORE action
  page.on("dialog", async (dialog) => {
    console.log("Type    :", dialog.type()); // 'alert'
    console.log("Message :", dialog.message()); // 'Hello'

    expect(dialog.type()).toBe("alert");
    expect(dialog.message()).toContain("Hello");

    await dialog.accept(); // clicks OK
  });

  // click the run button on first example
  await page.locator(".code-result__btn-run").first().click();

  // after alert dismissed, page continues normally
  await expect(page.locator(".code-result")).toBeVisible();
});
