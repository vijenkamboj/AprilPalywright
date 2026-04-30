import { LoginPage } from "../Pageobjects/LoginPage.js";
import { DashboardPage } from "../Pageobjects/DashboardPage.js";
import { CartPage } from "../Pageobjects/CartPage.js";
import { CheckoutPage } from "../Pageobjects/CheckoutPage.js";

export class POMManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getCheckoutPage() {
    return this.checkoutPage;
  }
}
