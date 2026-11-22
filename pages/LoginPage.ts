import { Locator, Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;

  // Locators
  private readonly returningCustomerHeading: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly warningMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.returningCustomerHeading = page.getByRole('heading', {
      name: 'Returning Customer',
      exact: true,
    });
    this.emailInput = page.getByRole('textbox', { name: 'E-Mail Address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password', exact: true });
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
    this.warningMessage = page.getByText(
      'Warning: No match for E-Mail Address and/or Password.',
      { exact: true },
    );
  }

  /** Checks whether the returning-customer login form is displayed. */
  async isLoginPageExists(): Promise<boolean> {
    return this.returningCustomerHeading.isVisible();
  }

  /**
   * Submits the provided customer credentials.
   * @param email - Customer email address
   * @param password - Customer password
   */
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email.trim() ? email : '');
    await this.passwordInput.fill(password.trim() ? password : '');
    await this.loginButton.click();
  }

  /** Checks whether the invalid-credentials warning is displayed. */
  async isWarningMessageVisible(): Promise<boolean> {
    return this.warningMessage.isVisible();
  }

  /**
   * Reads the invalid-credentials warning.
   * @returns The warning text
   */
  async getWarningMessage(): Promise<string> {
    return this.warningMessage.innerText();
  }
}
