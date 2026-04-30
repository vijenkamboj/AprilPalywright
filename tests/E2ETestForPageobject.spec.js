import { test, expect } from "@playwright/test";
import { POMManager } from "../utils/POMManager.js";
import Testdata from "../testData/TestData.json" assert { type: "json" };

//Open site → Login → Add product → View cart → Checkout → Place order → Confirm success.

test("End-to-End Order Flow", async ({ page }) => {
  const pom = new POMManager(page);

  // Step 1: Navigate to the app
  await pom.getLoginPage().goto();

  // Step 2: Perform login
  await pom.getLoginPage().login(Testdata.email, Testdata.password);

  // Step 3: Add product to cart
  await pom.getDashboardPage().addProductToCart("Zara Coat 3");

  //Step 4:Navigate to the cart
  await pom.getDashboardPage().goToCart();

  // Step 5: Proceed to checkout
  await pom.getCartPage().proceedToCheckout();

  // Step 6: Place order
  await pom.getCheckoutPage().fillDetailsAndPlaceOrder("India");

  // Step 7: Verify confirmation
  const confirmation = await pom.getCheckoutPage().verifyOrder();
  //expect(confirmation).toContain("Thank you for your order");
});
