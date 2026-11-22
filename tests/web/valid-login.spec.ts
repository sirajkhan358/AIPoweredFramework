import path from 'path';
import { test, expect } from '../../fixtures/pageFixtures';
import { DataProvider } from '../../utils/DataReader';

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

test('Valid customer login @allure.label.epic:OpenCart @allure.label.feature:AccountManagement @allure.label.story:ValidLogin @allure.label.severity:critical @master @sanity @regression @web', async ({
  homePage,
  loginPage,
  accountPage,
}) => {
  await test.step('1) Navigate to the login page', async () => {
    // 1. Open My Account and choose Login.
    await homePage.clickMyAccount();
    await homePage.clickLogin();
    expect(await loginPage.isLoginPageExists()).toBeTruthy();
  });

  await test.step('2) Log in with the verified test credentials', async () => {
    // 2. Reuse the valid credentials from the shared login test data.
    await loginPage.login(validCredentials.email, validCredentials.password);
    expect(await accountPage.isMyAccountPageExists()).toBeTruthy();
  });

  console.log('✅ Valid customer login completed.');
});
