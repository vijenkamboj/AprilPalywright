// pages/CartPage.js
import { expect } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator("text=Checkout");
    this.cartItems = page.locator(".cartSection h3");
  }

  async verifyProductInCart(productName) {
    await expect(this.cartItems).toContainText(productName);
  }

  async proceedToCheckout() {
    await this.checkoutButton.waitFor({ state: "visible" });
    await this.checkoutButton.click();
  }
}
