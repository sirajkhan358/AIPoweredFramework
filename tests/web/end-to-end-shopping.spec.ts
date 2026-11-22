import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Helper } from '../../utils/helper';

test('End-to-end customer shopping journey @allure.label.epic:OpenCart @allure.label.feature:ShoppingCart @allure.label.story:EndToEndShopping @allure.label.severity:critical @master @regression @end-to-end @web', async ({
  homePage,
  registerPage,
  loginPage,
  accountPage,
  logoutPage,
  productSearchPage,
  productPage,
  shoppingCartPage,
}) => {
  const password = RandomDataUtil.getPassword(12);
  const email = `qa.${Date.now()}.${RandomDataUtil.getNumber()}@example.com`;
  const { productName, productQuantity, totalPrice } = Helper.getProductDetails();

  await test.step('1) Register a new customer', async () => {
    // 1. Create a customer with dynamically generated unique details.
    await homePage.clickMyAccount();
    await homePage.clickRegister();
    expect(await registerPage.isRegistrationPageExists()).toBeTruthy();
    await registerPage.completeRegistration(
      RandomDataUtil.getFirstName(),
      RandomDataUtil.getLastName(),
      email,
      RandomDataUtil.getPhoneNumber(),
      password,
    );
    expect(await registerPage.isAccountCreatedConfirmationVisible()).toBeTruthy();
    await registerPage.clickMyAccount();
    expect(await accountPage.isMyAccountPageExists()).toBeTruthy();
  });

  await test.step('2) Log out of the new account', async () => {
    // 2. Log out before signing back in.
    await accountPage.clickLogout();
    expect(await logoutPage.isLogoutPageExists()).toBeTruthy();
    await logoutPage.clickContinue();
    expect(await homePage.isHomePageExists()).toBeTruthy();
  });

  await test.step('3) Log back in with the new customer credentials', async () => {
    // 3. Sign in with the credentials used for registration.
    await homePage.clickMyAccount();
    await homePage.clickLogin();
    await loginPage.login(email, password);
    expect(await accountPage.isMyAccountPageExists()).toBeTruthy();
  });

  await test.step('4) Search for and open the configured product', async () => {
    // 4. Search the store and open the matching product.
    await homePage.searchProduct(productName);
    expect(await productSearchPage.isProductVisible(productName)).toBeTruthy();
    await productSearchPage.clickProduct(productName);
    expect(await productPage.isProductPageExists(productName)).toBeTruthy();
  });

  await test.step('5) Add the product and verify the cart', async () => {
    // 5. Add the configured quantity and check the cart contents and price.
    await productPage.setQuantity(productQuantity);
    await productPage.clickAddToCart();
    expect(await productPage.isAddedToCartMessageVisible()).toBeTruthy();
    await homePage.clickShoppingCart();
    expect(await shoppingCartPage.isProductInCart(productName)).toBeTruthy();
    expect(await shoppingCartPage.getProductQuantity(productName)).toBe(productQuantity);
    expect(await shoppingCartPage.isProductPriceVisible(productName, totalPrice)).toBeTruthy();
    expect(await shoppingCartPage.getCartTotal()).toBe(totalPrice);
  });

  console.log('✅ End-to-end customer shopping journey completed.');
});
