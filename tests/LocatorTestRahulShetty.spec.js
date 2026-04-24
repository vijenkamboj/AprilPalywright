import { test, expect } from "@playwright/test";

test("locator sensing", async ({ page }) => {
  const productName = "ZARA COAT 3";

  // 1. Navigate to login page
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  // 2. Fill login form
  await page.locator("#userEmail").fill("vijen.kamboj@gmail.com");
  await page.locator("#userPassword").fill("India@2911");

  // 3. Click login button using getByRole
  await page.getByRole("button", { name: "login" }).click();

  // 4. Wait until at least one product title is visible
  await page.locator(".card-body b").first().waitFor();

  // 5. Collect all product titles
  const alltext = await page.locator(".card-body b").allTextContents();
  console.log(alltext);

  // 6. Count how many product cards exist
  const count = await page.locator(".card-body b").count();

  // 7. Loop through each product card
  for (let i = 0; i < count; i++) {
    // Get the text of the product title
    const title = await page.locator(".card-body b").nth(i).textContent();

    // 8. If the product matches "ZARA COAT 3"
    if (title === productName) {
      // Find the corresponding card and click "Add To Cart"
      await page
        .locator(".card-body")
        .nth(i)
        .locator("text= Add To Cart")
        .click();
      break; // Exit loop after adding the product
    }
  }
});
