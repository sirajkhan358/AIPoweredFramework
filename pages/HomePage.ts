import { Locator, Page } from '@playwright/test';

export class HomePage {
  private readonly page: Page;

  // Locators
  private readonly myAccountLink: Locator;
  private readonly registerLink: Locator;
  private readonly loginLink: Locator;
  private readonly logoutLink: Locator;
  private readonly searchBox: Locator;
  private readonly searchButton: Locator;
  private readonly shoppingCartLink: Locator;
  private readonly featuredHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.myAccountLink = page.getByRole('link', { name: /My Account/ }).first();
    this.registerLink = page.getByRole('link', { name: 'Register', exact: true });
    this.loginLink = page.getByRole('link', { name: 'Login', exact: true });
    this.logoutLink = page.getByRole('link', { name: 'Logout', exact: true });
    this.searchBox = page.getByRole('textbox', { name: 'Search' });
    this.searchButton = page.locator('#search').getByRole('button');
    this.shoppingCartLink = page.getByRole('link', { name: /Shopping Cart/ }).first();
    this.featuredHeading = page.getByRole('heading', { name: 'Featured' });
  }

  /** Opens the My Account menu. */
  async clickMyAccount(): Promise<void> {
    await this.myAccountLink.click();
  }

  /** Opens the registration page from the My Account menu. */
  async clickRegister(): Promise<void> {
    await Promise.all([
      this.page.waitForURL(/route=account\/register/),
      this.registerLink.click(),
    ]);
  }

  /** Opens the login page from the My Account menu. */
  async clickLogin(): Promise<void> {
    await Promise.all([
      this.page.waitForURL(/route=account\/login/),
      this.loginLink.click(),
    ]);
  }

  /**
   * Searches for a product.
   * @param productName - Product name to search for
   */
  async searchProduct(productName: string): Promise<void> {
    await this.searchBox.fill(productName);
    await this.searchButton.click();
  }

  /** Opens the shopping cart. */
  async clickShoppingCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  /** Checks whether the home page is displayed. */
  async isHomePageExists(): Promise<boolean> {
    return this.featuredHeading.isVisible();
  }

  /** Checks whether the logged-out Login option is displayed. */
  async isLoginOptionVisible(): Promise<boolean> {
    return this.loginLink.isVisible();
  }

  /** Checks whether the logged-out Register option is displayed. */
  async isRegisterOptionVisible(): Promise<boolean> {
    return this.registerLink.isVisible();
  }

  /** Checks whether the authenticated Logout option is displayed. */
  async isLogoutOptionVisible(): Promise<boolean> {
    return this.logoutLink.isVisible();
  }
}
