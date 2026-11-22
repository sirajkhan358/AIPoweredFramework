import { Locator, Page } from '@playwright/test';
import { AccountPage } from './AccountPage';

export class RegisterPage {
  private readonly page: Page;

  // Locators
  private readonly heading: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly telephoneInput: Locator;
  private readonly passwordInput: Locator;
  private readonly privacyPolicyCheckbox: Locator;
  private readonly continueButton: Locator;
  private readonly accountCreatedHeading: Locator;
  private readonly myAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.heading = page.getByRole('heading', { name: 'Register Account', exact: true });
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.emailInput = page.getByPlaceholder('E-Mail');
    this.telephoneInput = page.getByPlaceholder('Telephone');
    this.passwordInput = page.getByPlaceholder('Password', { exact: true });
    this.privacyPolicyCheckbox = page.getByRole('checkbox');
    this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
    this.accountCreatedHeading = page.getByRole('heading', {
      name: 'Your Account Has Been Created!',
      exact: true,
    });
    this.myAccountLink = page
      .getByRole('complementary')
      .getByRole('link', { name: 'My Account', exact: true });
  }

  /**
   * Checks whether the registration page is displayed.
   * @returns true when the registration heading is visible
   */
  async isRegistrationPageExists(): Promise<boolean> {
    return this.heading.isVisible();
  }

  /**
   * Completes and submits the registration form.
   * @param firstName - Customer first name
   * @param lastName - Customer last name
   * @param email - Unique customer email
   * @param telephone - Customer telephone number
   * @param password - Customer password
   */
  async completeRegistration(
    firstName: string,
    lastName: string,
    email: string,
    telephone: string,
    password: string,
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.telephoneInput.fill(telephone);
    await this.passwordInput.fill(password);
    await this.page.getByPlaceholder('Password Confirm').fill(password);
    await this.privacyPolicyCheckbox.check();
    await this.continueButton.click();
  }

  /** Checks whether account creation succeeded. */
  async isAccountCreatedConfirmationVisible(): Promise<boolean> {
    return this.accountCreatedHeading.isVisible();
  }

  /**
   * Opens the newly created customer's account dashboard.
   * @returns The account page object
   */
  async clickMyAccount(): Promise<AccountPage> {
    await this.myAccountLink.click();
    return new AccountPage(this.page);
  }
}
