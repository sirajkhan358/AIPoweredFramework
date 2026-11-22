import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '../../fixtures/pageFixtures';
import { DataProvider } from '../../utils/DataReader';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type LoginData = {
  testName: string;
  email: string;
  password: string;
  expected: 'success' | 'failure';
};

const loginData: LoginData[] = DataProvider.readJson(
  path.resolve(__dirname, '../../testdata/opencart_logindata.json'),
);

for (const [index, data] of loginData.entries()) {
  test(`${data.testName} row ${index + 1} @allure.label.epic:OpenCart @allure.label.feature:AccountManagement @allure.label.story:DataDrivenLogin @allure.label.severity:normal @master @regression @datadriven @web`, async ({
    homePage,
    loginPage,
    accountPage,
  }) => {
    await test.step('1) Open the OpenCart login page', async () => {
      // 1. Open My Account and choose Login on the configured application.
      await homePage.clickMyAccount();
      await homePage.clickLogin();
      expect(await loginPage.isLoginPageExists()).toBeTruthy();
    });

    await test.step('2) Submit the row credentials and verify the expected result', async () => {
      // 2. Preserve empty values and validate the result for this data row.
      await loginPage.login(data.email, data.password);

      if (data.expected === 'success') {
        expect(await accountPage.isMyAccountPageExists()).toBeTruthy();
      } else {
        expect(await loginPage.isWarningMessageVisible()).toBeTruthy();
        expect(await accountPage.isMyAccountPageExists()).toBeFalsy();
      }
    });

    console.log(`✅ Data-driven login scenario completed: ${data.testName}.`);
  });
}
