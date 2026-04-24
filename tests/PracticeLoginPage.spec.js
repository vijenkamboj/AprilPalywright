import { test, expect } from "@playwright/test";
test("login to the application", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#password").fill("Learning@830$3mK2");
  await page.locator("//label[2]//span[2]").click();
  await expect(page.locator("//label[2]//span[2]")).toBeChecked();
  await page
    .locator("xpath=.//select[@class='form-control']")
    .selectOption({ index: 1 });
  await page.locator("#terms").click();
  expect(page.locator("#terms").isChecked()).toBeTruthy(); //action is performed inside the barces so we have not put await
  await page.locator("#signInBtn").click();
  // await expect(page.locator("h2")).toHaveText("ProtoCommerce Home"); //Assertion after selection
  await page.waitForLoadState("networkidle"); //let all API calls to be completed before assertion
  await page.locator(".card-body a").first().waitFor({ state: "visible" }); //wait for the first element to be visible before assertion
  // await page.locator(".card-body a").last().waitFor();
  console.log(await page.locator(".card-body a").nth(0).textContent()); //no autowaiting for textContent, so we need to wait for the element to be visible before getting the text content
  console.log(await page.locator(".card-body a").nth(1).textContent()); //no autowaiting for inputValue, so we need to wait for the element to be visible before getting the input value
  console.log(await page.locator(".card-body a").allTextContents());
});

test("Handling child windows and tabs", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"), // wait for new tab
    page.locator("[href*='documents-request']").click(), // click link
  ]);

  // Get text from the new page

  let text = await newPage
    .locator("xpath=//p[@class='im-para red']")
    .textContent();
  console.log(text);
  let shorttext = text.split("@")[1]; //split the text and get the second word, then trim the whitespace
  console.log(shorttext);
  console.log(shorttext.split(" ")[0]); //get the first word from the split result
});

test("test report", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#password").fill("Learning@830$3mK2");

  // Radio button
  await page.locator("input[value='consult']").click();
  await expect(page.locator("input[value='consult']")).toBeChecked();

  // Dropdown
  await page.locator("select.form-control").selectOption({ index: 1 });

  // Terms checkbox
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();

  // Sign in
  await page.locator("#signInBtn").click();
  await page.waitForLoadState("networkidle");

  // Wait for products
  await page.locator(".card-body a").first().waitFor({ state: "visible" });

  console.log(await page.locator(".card-body a").nth(0).textContent());
  console.log(await page.locator(".card-body a").nth(1).textContent());
  console.log(await page.locator(".card-body a").allTextContents());
});

test("Handling child windows and tabs1", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.locator("[href*='documents-request']").click(),
  ]);

  const text = await newPage.locator("p.im-para.red").textContent();
  console.log(text);

  const shorttext = text.split("@")[1];
  console.log(shorttext);
  console.log(shorttext.split(" ")[0]);
});

test("E2E Scenario for e commerce site", async ({ page }) => {
  const productname = "iphone X";

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#password").fill("Learning@830$3mK2");

  await page.locator("//label[2]//span[2]").click();
  await expect(page.locator("//label[2]//span[2]")).toBeChecked();

  await page.locator("select.form-control").selectOption({ index: 1 });

  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();

  await page.locator("#signInBtn").click();

  await page.waitForLoadState("networkidle");
  await page.locator(".card-body").first().waitFor({ state: "visible" });
  const products = page.locator(".card-body");
  const count = await products.count();
  //const name = await products.nth(i).locator("a").textContent();
  for (let i = 0; i < count; i++) {
    const name = await products.nth(i).locator("a").textContent();

    if (name.trim() === productname) {
      const addButton = products.nth(i).locator("text=Add");
      // await addButton.scrollIntoViewIfNeeded();
      await addButton.waitFor({ state: "visible" });
      await addButton.click({ force: true });
      break;
    }
  }
  await page.pause();
});
