import { Locator, Page } from '@playwright/test';

export class ProductPage {
  private readonly page: Page;

  // Locators
  private readonly quantityInput: Locator;
  private readonly priceHeading: Locator;
  private readonly addToCartButton: Locator;
  private readonly addedToCartMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.quantityInput = page.getByRole('textbox', { name: 'Qty' });
    this.priceHeading = page.getByRole('heading', { level: 2 });
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart', exact: true });
    this.addedToCartMessage = page.getByText('Success: You have added', { exact: false });
  }

  /**
   * Checks whether the requested product page is displayed.
   * @param productName - Expected product name
   */
  async isProductPageExists(productName: string): Promise<boolean> {
    return this.page.getByRole('heading', { level: 1, name: productName, exact: true }).isVisible();
  }

  /**
   * Sets the product quantity.
   * @param quantity - Quantity to add
   */
  async setQuantity(quantity: string): Promise<void> {
    await this.quantityInput.fill(quantity);
  }

  /** Adds the displayed product to the shopping cart. */
  async clickAddToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  /** Checks whether the product-added confirmation is displayed. */
  async isAddedToCartMessageVisible(): Promise<boolean> {
    await this.addedToCartMessage.waitFor({ state: 'visible' });
    return this.addedToCartMessage.isVisible();
  }

  /**
   * Reads the displayed product price.
   * @returns The product price
   */
  async getProductPrice(): Promise<string> {
    return this.priceHeading.innerText();
  }
}
