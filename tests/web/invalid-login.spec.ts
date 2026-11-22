import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';

test('Invalid customer login @allure.label.epic:OpenCart @allure.label.feature:AccountManagement @allure.label.story:InvalidLogin @allure.label.severity:normal @master @sanity @regression @web', async ({
  homePage,
  loginPage,
  accountPage,
}) => {
  const email = `invalid-${Date.now()}@example.invalid`;
  const password = RandomDataUtil.getPassword(12);

  await test.step('1) Navigate to the login page', async () => {
    // 1. Open My Account and choose Login.
    await homePage.clickMyAccount();
    await homePage.clickLogin();
    expect(await loginPage.isLoginPageExists()).toBeTruthy();
  });

  await test.step('2) Submit invalid credentials', async () => {
    // 2. Submit values that cannot belong to a registered customer.
    await loginPage.login(email, password);
    expect(await loginPage.isWarningMessageVisible()).toBeTruthy();
    expect(await loginPage.getWarningMessage()).toBe(
      'Warning: No match for E-Mail Address and/or Password.',
    );
    expect(await accountPage.isMyAccountPageExists()).toBeFalsy();
  });

  console.log('✅ Invalid customer login was rejected.');
});
