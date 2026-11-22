import { Locator, Page } from '@playwright/test';

export class ShoppingCartPage {
  private readonly page: Page;

  // Locators
  private readonly cartHeading: Locator;
  private readonly totalRow: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.cartHeading = page.getByRole('heading', { name: /^Shopping Cart/ });
    this.totalRow = page.getByRole('row').filter({ hasText: 'Total:' });
  }

  private productRow(productName: string): Locator {
    return this.page.getByRole('row').filter({ hasText: productName });
  }

  /** Checks whether the shopping cart page is displayed. */
  async isShoppingCartPageExists(): Promise<boolean> {
    return this.cartHeading.isVisible();
  }

  /**
   * Checks whether the requested product is in the cart.
   * @param productName - Expected product name
   */
  async isProductInCart(productName: string): Promise<boolean> {
    return this.productRow(productName).isVisible();
  }

  /**
   * Reads the quantity of a product in the cart.
   * @param productName - Product name in the cart
   * @returns The displayed quantity
   */
  async getProductQuantity(productName: string): Promise<string> {
    return this.productRow(productName).getByRole('textbox').inputValue();
  }

  /**
   * Checks whether the expected unit price is displayed for a product.
   * @param productName - Product name in the cart
   * @param price - Expected displayed price
   */
  async isProductPriceVisible(productName: string, price: string): Promise<boolean> {
    return this.productRow(productName).getByText(price, { exact: true }).first().isVisible();
  }

  /**
   * Reads the cart's final total.
   * @returns The displayed cart total
   */
  async getCartTotal(): Promise<string> {
    return this.totalRow.getByRole('cell').last().innerText();
  }
}
