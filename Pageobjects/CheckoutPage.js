// pages/CheckoutPage.js
import { expect } from "@playwright/test";

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.countryInput = page.locator("[placeholder='Select Country']");
    this.countryDropdown = page.locator(".ta-results");
    this.placeOrderButton = page.locator("text=Place Order");
    this.orderConfirmation = page.locator(".hero-primary");
  }

  async fillDetailsAndPlaceOrder(country) {
    await this.countryInput.type(country, { delay: 100 });
    await this.countryDropdown.locator("button").first().click();
    await this.placeOrderButton.click();
  }

  async verifyOrder() {
    await expect(this.orderConfirmation).toHaveText(
      " Thankyou for the order. ",
    );
  }
}
