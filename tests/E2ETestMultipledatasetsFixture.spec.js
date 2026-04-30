import { expect } from "@playwright/test";
import { test } from "../fixture/dataFixture.js";
import { POMManager } from "../utils/POMManager.js";
import datasets from "../testData/TestData.json" assert { type: "json" };

test("Order Flow", async ({ page }) => {
  const pom = new POMManager(page);

  await pom.getLoginPage().goto();
  await pom.getLoginPage().login(testData.email, testData.password);

  await pom.getDashboardPage().addProductToCart(testData.product);
  await pom.getDashboardPage().goToCart();

  await pom.getCartPage().proceedToCheckout();
  await pom.getCheckoutPage().fillDetailsAndPlaceOrder(testData.country);

  const confirmation = await pom.getCheckoutPage().verifyOrder();
  //expect(confirmation).toContain(testData.confirmationMessage);
});
