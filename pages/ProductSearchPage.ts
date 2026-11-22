import { Locator, Page } from '@playwright/test';

export class ProductSearchPage {
  private readonly page: Page;

  // Locators
  private readonly resultsHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.resultsHeading = page.getByRole('heading', {
      name: 'Products meeting the search criteria',
      exact: true,
    });
  }

  private productLink(productName: string): Locator {
    return this.page
      .getByRole('heading', { level: 4 })
      .getByRole('link', { name: productName, exact: true });
  }

  /** Checks whether the search results page is displayed. */
  async isSearchResultsPageExists(): Promise<boolean> {
    return this.resultsHeading.isVisible();
  }

  /**
   * Checks whether a product appears in the search results.
   * @param productName - Expected product name
   */
  async isProductVisible(productName: string): Promise<boolean> {
    return this.productLink(productName).isVisible();
  }

  /**
   * Reads the product name from the search result.
   * @param productName - Expected product name
   * @returns The displayed product name
   */
  async getProductName(productName: string): Promise<string> {
    return this.productLink(productName).innerText();
  }

  /**
   * Opens a product from the search results.
   * @param productName - Product name to open
   */
  async clickProduct(productName: string): Promise<void> {
    await Promise.all([
      this.page.waitForURL(/route=product\/product/),
      this.productLink(productName).click(),
    ]);
  }
}
