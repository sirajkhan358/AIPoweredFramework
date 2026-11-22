import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Add a product to the shopping cart @allure.label.epic:OpenCart @allure.label.feature:ShoppingCart @allure.label.story:AddProductToCart @allure.label.severity:critical @master @sanity @regression @web', async ({
  homePage,
  productSearchPage,
  productPage,
  shoppingCartPage,
}) => {
  const { productName, productQuantity } = Helper.getProductDetails();

  await test.step('1) Search for and open the configured product', async () => {
    // 1. Find the known product and open its details.
    await homePage.searchProduct(productName);
    expect(await productSearchPage.isProductVisible(productName)).toBeTruthy();
    await productSearchPage.clickProduct(productName);
    expect(await productPage.isProductPageExists(productName)).toBeTruthy();
  });

  await test.step('2) Add the product with the configured quantity', async () => {
    // 2. Set the quantity and add the product to the cart.
    await productPage.setQuantity(productQuantity);
    await productPage.clickAddToCart();
    expect(await productPage.isAddedToCartMessageVisible()).toBeTruthy();
  });

  await test.step('3) Verify the cart item and quantity', async () => {
    // 3. Open the cart and verify the selected product and quantity.
    await homePage.clickShoppingCart();
    expect(await shoppingCartPage.isShoppingCartPageExists()).toBeTruthy();
    expect(await shoppingCartPage.isProductInCart(productName)).toBeTruthy();
    expect(await shoppingCartPage.getProductQuantity(productName)).toBe(productQuantity);
  });

  console.log('✅ Product was added to the shopping cart.');
});
