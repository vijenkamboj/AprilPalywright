import { test, expect, request } from "@playwright/test";
import { APiUtils } from "./utils/APiUtils.js";

const loginPayLoad = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};
const orderPayLoad = {
  orders: [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }],
};

let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad); //return token and orderId
});

//create order is success
test("@API Place the order", async ({ page }) => {
  await page.addInitScript((value) => {
    //javascriptmethod that allows you to inject JavaScript code into the browser context before any page scripts run. This is particularly useful for setting up the environment, such as injecting authentication tokens, before the page loads.
    //injecting your login token into the browser’s localStorage before the page loads,
    window.localStorage.setItem("token", value);
  }, response.token); //inject response as orderid and token in the local storage
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  //await page.pause();
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});

//Verify if order created is showing in history page
// Precondition - create order -
