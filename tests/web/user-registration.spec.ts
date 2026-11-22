import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';

test('User registration @allure.label.epic:OpenCart @allure.label.feature:AccountManagement @allure.label.story:CustomerRegistration @allure.label.severity:critical @master @sanity @regression @web', async ({
  homePage,
  registerPage,
  accountPage,
}) => {
  const password = RandomDataUtil.getPassword(12);
  const registrationEmail = `qa.${Date.now()}.${RandomDataUtil.getNumber()}@example.com`;

  await test.step('1) Navigate to the registration page', async () => {
    // 1. Open My Account and choose Register.
    await homePage.clickMyAccount();
    await homePage.clickRegister();
    expect(await registerPage.isRegistrationPageExists()).toBeTruthy();
  });

  await test.step('2) Submit a new customer registration', async () => {
    // 2. Enter unique customer details, accept the Privacy Policy, and submit.
    await registerPage.completeRegistration(
      RandomDataUtil.getFirstName(),
      RandomDataUtil.getLastName(),
      registrationEmail,
      RandomDataUtil.getPhoneNumber(),
      password,
    );
  });

  await test.step('3) Verify account creation and account navigation', async () => {
    // 3. Confirm account creation and open the new account dashboard.
    expect(await registerPage.isAccountCreatedConfirmationVisible()).toBeTruthy();
    await registerPage.clickMyAccount();
    expect(await accountPage.isMyAccountPageExists()).toBeTruthy();
  });

  console.log('✅ Customer registration completed.');
});
