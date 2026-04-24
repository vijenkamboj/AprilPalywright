import { test, expect } from "@playwright/test";

test.only("smart locators", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await expect(
    page.getByLabel("Check me out if you Love IceCreams!"),
  ).toBeChecked();
  await page.getByLabel("Employed").check();
  await expect(page.getByLabel("Employed")).toBeChecked();
  await page.getByLabel("Gender").selectOption("Male");
  //await page.pause();
  await page.getByPlaceholder("Password").fill("123456");
  await page.getByRole("button", { name: "Submit" }).click();
  await page
    .getByText("Success! The Form has been submitted successfully!.")
    .isVisible();

  await page.getByRole("link", { name: "Shop" }).click();
  await page
    .locator("app-card")
    .filter({ hasText: "Blackberry" })
    .getByRole("button")
    .click();
});
