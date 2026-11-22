import { Locator, Page } from '@playwright/test';
import { HomePage } from './HomePage';

export class LogoutPage {
  private readonly page: Page;

  // Locators
  private readonly logoutHeading: Locator;
  private readonly continueLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.logoutHeading = page.getByRole('heading', { name: 'Account Logout', exact: true });
    this.continueLink = page.getByRole('link', { name: 'Continue', exact: true });
  }

  /** Checks whether the logout confirmation page is displayed. */
  async isLogoutPageExists(): Promise<boolean> {
    return this.logoutHeading.isVisible();
  }

  /**
   * Continues to the store home page after logout.
   * @returns The home page object
   */
  async clickContinue(): Promise<HomePage> {
    await this.continueLink.click();
    return new HomePage(this.page);
  }
}
