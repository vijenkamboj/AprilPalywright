// pages/DashboardPage.js
export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.productCards = page.locator(".card-body");
    this.cartButton = page.locator("[routerlink*='cart']");
  }

  async addProductToCart(productName) {
    const product = this.productCards.filter({ hasText: productName });
    await product.locator("text=Add To Cart").click();
  }

  async goToCart() {
    await this.cartButton.click();
  }
}
