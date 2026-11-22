import { test as base } from '@playwright/test';
import dotenv from 'dotenv';
import { AccountPage } from '../pages/AccountPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import { ProductPage } from '../pages/ProductPage';
import { ProductSearchPage } from '../pages/ProductSearchPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';

dotenv.config();

const WEB_APP_URL = process.env.WEB_APP_URL;
const LOCAL_WEB_APP_URL = process.env.LOCAL_WEB_APP_URL;

type PageFixtures = {
  homePage: HomePage;
  localHomePage: HomePage;
  registerPage: RegisterPage;
  loginPage: LoginPage;
  accountPage: AccountPage;
  logoutPage: LogoutPage;
  productSearchPage: ProductSearchPage;
  productPage: ProductPage;
  shoppingCartPage: ShoppingCartPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    if (!WEB_APP_URL) {
      throw new Error('WEB_APP_URL must be set in the .env file.');
    }

    await page.goto(WEB_APP_URL);
    await use(new HomePage(page));
  },
  localHomePage: async ({ page }, use) => {
    if (!LOCAL_WEB_APP_URL) {
      throw new Error('LOCAL_WEB_APP_URL must be set in the .env file.');
    }

    await page.goto(LOCAL_WEB_APP_URL);
    await use(new HomePage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  logoutPage: async ({ page }, use) => {
    await use(new LogoutPage(page));
  },
  productSearchPage: async ({ page }, use) => {
    await use(new ProductSearchPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  shoppingCartPage: async ({ page }, use) => {
    await use(new ShoppingCartPage(page));
  },
});

export { expect } from '@playwright/test';
