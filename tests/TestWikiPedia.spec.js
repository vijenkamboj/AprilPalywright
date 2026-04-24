import { test, expect } from "@playwright/test";

test("Count the footers in the page and click on the third one", async ({
  page,
}) => {
  await page.goto("https://www.wikipedia.org/");
  const footers = await page.locator(".other-project-link").allTextContents();
  console.log(footers);
  const count = await page.locator(".other-project-link").count();
  const products = await page.locator(".other-project-link");
  for (let i = 0; i < count; i++) {
    products.nth(2).click(); //click on the third footer
    break;
  }
});
