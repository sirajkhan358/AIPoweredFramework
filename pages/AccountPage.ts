import { Locator, Page } from '@playwright/test';
import { LogoutPage } from './LogoutPage';

export class AccountPage {
  private readonly page: Page;

  // Locators
  private readonly accountHeading: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.accountHeading = page.getByRole('heading', {
      name: 'My Account',
      exact: true,
      level: 2,
    });
    this.logoutLink = page
      .getByRole('complementary')
      .getByRole('link', { name: 'Logout', exact: true });
  }

  /** Checks whether the authenticated account dashboard is displayed. */
  async isMyAccountPageExists(): Promise<boolean> {
    return this.accountHeading.isVisible();
  }

  /**
   * Logs out the current customer.
   * @returns The logout confirmation page object
   */
  async clickLogout(): Promise<LogoutPage> {
    await this.logoutLink.click();
    return new LogoutPage(this.page);
  }
}
