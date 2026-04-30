import { test, expect } from "@playwright/test";
import { POMManager } from "../utils/POMManager.js";
import datasets from "../testData/TestData.json" assert { type: "json" };

for (const data of datasets) {
  test(`Order Flow for ${data.email}`, async ({ page }) => {
    const pom = new POMManager(page);

    await pom.getLoginPage().goto();
    await pom.getLoginPage().login(data.email, data.password);

    await pom.getDashboardPage().addProductToCart(data.product);
    await pom.getDashboardPage().goToCart();

    await pom.getCartPage().proceedToCheckout();
    await pom.getCheckoutPage().fillDetailsAndPlaceOrder(data.country);

    const confirmation = await pom.getCheckoutPage().verifyOrder();
    //expect(confirmation).toContain(data.confirmationMessage);
  });
}
