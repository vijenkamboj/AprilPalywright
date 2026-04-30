// pages/LoginPage.js
import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator("#userEmail"); //locators in constructors
    this.passwordInput = page.locator("#userPassword");
    this.loginButton = page.locator("[value='Login']");
    this.cartButton = page.locator("[routerlink*='cart']"); // reliable post-login element
  }

  async goto() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.waitFor({ state: "visible" });
    await this.loginButton.click();

    // Wait for cart button to appear as proof of successful login
    // await this.cartButton.waitFor({ state: "visible" });
    // await expect(this.cartButton).toBeVisible();
  }
}
