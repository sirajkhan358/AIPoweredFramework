import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '../../fixtures/pageFixtures';
import { DataProvider } from '../../utils/DataReader';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type LoginData = {
  email: string;
  password: string;
  expected: 'success' | 'failure';
};

const loginData: LoginData[] = DataProvider.readJson(
  path.resolve(__dirname, '../../testdata/opencart_logindata.json'),
);
const validCredentials = loginData.find(({ expected }) => expected === 'success');

if (!validCredentials) {
  throw new Error('opencart_logindata.json must contain a successful login row.');
}

test('Customer logout @allure.label.epic:OpenCart @allure.label.feature:AccountManagement @allure.label.story:CustomerLogout @allure.label.severity:normal @master @sanity @regression @web', async ({
  homePage,
  loginPage,
  accountPage,
  logoutPage,
}) => {
  await test.step('1) Log in with configured customer credentials', async () => {
    // 1. Navigate to Login and authenticate the customer.
    await homePage.clickMyAccount();
    await homePage.clickLogin();
    await loginPage.login(validCredentials.email, validCredentials.password);
    expect(await accountPage.isMyAccountPageExists()).toBeTruthy();
  });

  await test.step('2) Log out and verify the confirmation page', async () => {
    // 2. Select Logout from the authenticated account navigation.
    await accountPage.clickLogout();
    expect(await logoutPage.isLogoutPageExists()).toBeTruthy();
  });

  await test.step('3) Continue to the home page and verify logged-out navigation', async () => {
    // 3. Continue to the home page and check the account menu.
    await logoutPage.clickContinue();
    expect(await homePage.isHomePageExists()).toBeTruthy();
    await homePage.clickMyAccount();
    expect(await homePage.isLoginOptionVisible()).toBeTruthy();
    expect(await homePage.isRegisterOptionVisible()).toBeTruthy();
    expect(await homePage.isLogoutOptionVisible()).toBeFalsy();
  });

  console.log('✅ Customer logout completed.');
});
