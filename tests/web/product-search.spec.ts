import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Search for a known product @allure.label.epic:OpenCart @allure.label.feature:ProductDiscovery @allure.label.story:ProductSearch @allure.label.severity:normal @master @sanity @regression @web', async ({
  homePage,
  productSearchPage,
}) => {
  const { productName } = Helper.getProductDetails();

  await test.step('1) Search for the configured product', async () => {
    // 1. Search the store for the known product.
    await homePage.searchProduct(productName);
    expect(await productSearchPage.isSearchResultsPageExists()).toBeTruthy();
  });

  await test.step('2) Verify the matching product is displayed', async () => {
    // 2. Confirm the result name matches the search criteria.
    expect(await productSearchPage.isProductVisible(productName)).toBeTruthy();
    expect(await productSearchPage.getProductName(productName)).toBe(productName);
  });

  console.log('✅ Product search completed.');
});
