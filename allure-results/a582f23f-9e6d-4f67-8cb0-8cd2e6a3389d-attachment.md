# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\valid-login.spec.ts >> Valid customer login @allure.label.epic:OpenCart @allure.label.feature:AccountManagement @allure.label.story:ValidLogin @allure.label.severity:critical @master @sanity @regression @web
- Location: tests\web\valid-login.spec.ts:3:1

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Page snapshot

```yaml
- generic [active] [ref=f55e1]:
  - navigation [ref=f55e2]:
    - generic [ref=f55e3]:
      - button "$ Currency " [ref=f55e7] [cursor=pointer]:
        - strong [ref=f55e8]: $
        - text: Currency
        - generic [ref=f55e9]: 
      - list [ref=f55e11]:
        - listitem [ref=f55e12]:
          - link "" [ref=f55e13] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=information/contact
          - text: "123456789"
        - listitem [ref=f55e15]:
          - link " My Account" [ref=f55e16] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=account/account
            - generic [ref=f55e17]: 
            - text: My Account
        - listitem [ref=f55e19]:
          - link " Wish List (0)" [ref=f55e20] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=account/wishlist
            - generic [ref=f55e21]: 
            - text: Wish List (0)
        - listitem [ref=f55e22]:
          - link " Shopping Cart" [ref=f55e23] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=checkout/cart
            - generic [ref=f55e24]: 
            - text: Shopping Cart
        - listitem [ref=f55e25]:
          - link " Checkout" [ref=f55e26] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=checkout/checkout
            - generic [ref=f55e27]: 
            - text: Checkout
  - banner [ref=f55e28]:
    - generic [ref=f55e30]:
      - heading [level=1] [ref=f55e33]:
        - link "Qafox.com" [ref=f55e34] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=common/home
      - generic [ref=f55e36]:
        - textbox "Search" [ref=f55e37]
        - button "" [ref=f55e39] [cursor=pointer]
      - button " 0 item(s) - $0.00" [ref=f55e43] [cursor=pointer]:
        - generic [ref=f55e44]: 
        - text: 0 item(s) - $0.00
  - navigation [ref=f55e46]:
    - generic: 
    - list [ref=f55e48]:
      - listitem [ref=f55e49]:
        - link "Desktops" [ref=f55e50] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=product/category&path=20
      - listitem [ref=f55e51]:
        - link "Laptops & Notebooks" [ref=f55e52] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=product/category&path=18
      - listitem [ref=f55e53]:
        - link "Components" [ref=f55e54] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=product/category&path=25
      - listitem [ref=f55e55]:
        - link "Tablets" [ref=f55e56] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=product/category&path=57
      - listitem [ref=f55e57]:
        - link "Software" [ref=f55e58] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=product/category&path=17
      - listitem [ref=f55e59]:
        - link "Phones & PDAs" [ref=f55e60] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=product/category&path=24
      - listitem [ref=f55e61]:
        - link "Cameras" [ref=f55e62] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=product/category&path=33
      - listitem [ref=f55e63]:
        - link "MP3 Players" [ref=f55e64] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=product/category&path=34
  - generic [ref=f55e65]:
    - list [ref=f55e66]:
      - listitem [ref=f55e67]:
        - link "" [ref=f55e68] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=common/home
      - listitem [ref=f55e70]:
        - link "Account" [ref=f55e71] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=account/account
      - listitem [ref=f55e72]:
        - link "Login" [ref=f55e73] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=account/login
    - generic [ref=f55e74]:
      - generic [ref=f55e75]: 
      - text: "Warning: No match for E-Mail Address and/or Password."
    - generic [ref=f55e76]:
      - generic [ref=f55e78]:
        - generic [ref=f55e80]:
          - heading "New Customer" [level=2] [ref=f55e81]
          - paragraph [ref=f55e82]:
            - strong [ref=f55e83]: Register Account
          - paragraph [ref=f55e84]: By creating an account you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have previously made.
          - link "Continue" [ref=f55e85] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=account/register
        - generic [ref=f55e87]:
          - heading "Returning Customer" [level=2] [ref=f55e88]
          - paragraph [ref=f55e89]:
            - strong [ref=f55e90]: I am a returning customer
          - generic [ref=f55e91]:
            - generic [ref=f55e92]:
              - generic [ref=f55e93]: E-Mail Address
              - textbox "E-Mail Address" [ref=f55e94]: YOUR_APP_EMAIL
            - generic [ref=f55e95]:
              - generic [ref=f55e96]: Password
              - textbox "Password" [ref=f55e97]: YOUR_APP_PASSWORD
              - link "Forgotten Password" [ref=f55e98] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=account/forgotten
            - button "Login" [ref=f55e99] [cursor=pointer]
      - complementary [ref=f55e100]:
        - generic [ref=f55e101]:
          - link "Login" [ref=f55e102] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=account/login
          - link "Register" [ref=f55e103] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=account/register
          - link "Forgotten Password" [ref=f55e104] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=account/forgotten
          - link "My Account" [ref=f55e105] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=account/account
          - link "Address Book" [ref=f55e106] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=account/address
          - link "Wish List" [ref=f55e107] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=account/wishlist
          - link "Order History" [ref=f55e108] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=account/order
          - link "Downloads" [ref=f55e109] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=account/download
          - link "Recurring payments" [ref=f55e110] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=account/recurring
          - link "Reward Points" [ref=f55e111] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=account/reward
          - link "Returns" [ref=f55e112] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=account/return
          - link "Transactions" [ref=f55e113] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=account/transaction
          - link "Newsletter" [ref=f55e114] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=account/newsletter
  - contentinfo [ref=f55e115]:
    - generic [ref=f55e116]:
      - generic [ref=f55e117]:
        - generic [ref=f55e118]:
          - heading "Information" [level=5] [ref=f55e119]
          - list [ref=f55e120]:
            - listitem [ref=f55e121]:
              - link "About Us" [ref=f55e122] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=information/information&information_id=4
            - listitem [ref=f55e123]:
              - link "Delivery Information" [ref=f55e124] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=information/information&information_id=6
            - listitem [ref=f55e125]:
              - link "Privacy Policy" [ref=f55e126] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=information/information&information_id=3
            - listitem [ref=f55e127]:
              - link "Terms & Conditions" [ref=f55e128] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=information/information&information_id=5
        - generic [ref=f55e129]:
          - heading "Customer Service" [level=5] [ref=f55e130]
          - list [ref=f55e131]:
            - listitem [ref=f55e132]:
              - link "Contact Us" [ref=f55e133] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=information/contact
            - listitem [ref=f55e134]:
              - link "Returns" [ref=f55e135] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=account/return/add
            - listitem [ref=f55e136]:
              - link "Site Map" [ref=f55e137] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=information/sitemap
        - generic [ref=f55e138]:
          - heading "Extras" [level=5] [ref=f55e139]
          - list [ref=f55e140]:
            - listitem [ref=f55e141]:
              - link "Brands" [ref=f55e142] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=product/manufacturer
            - listitem [ref=f55e143]:
              - link "Gift Certificates" [ref=f55e144] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=account/voucher
            - listitem [ref=f55e145]:
              - link "Affiliate" [ref=f55e146] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=affiliate/login
            - listitem [ref=f55e147]:
              - link "Specials" [ref=f55e148] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=product/special
        - generic [ref=f55e149]:
          - heading "My Account" [level=5] [ref=f55e150]
          - list [ref=f55e151]:
            - listitem [ref=f55e152]:
              - link "My Account" [ref=f55e153] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=account/account
            - listitem [ref=f55e154]:
              - link "Order History" [ref=f55e155] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=account/order
            - listitem [ref=f55e156]:
              - link "Wish List" [ref=f55e157] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=account/wishlist
            - listitem [ref=f55e158]:
              - link "Newsletter" [ref=f55e159] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=account/newsletter
      - separator [ref=f55e160]
      - paragraph [ref=f55e161]:
        - text: Powered By
        - link "OpenCart" [ref=f55e162] [cursor=pointer]:
          - /url: http://www.opencart.com
        - text: Qafox.com © 2026
```

# Test source

```ts
  1  | import { test, expect } from '../../fixtures/pageFixtures';
  2  | 
  3  | test('Valid customer login @allure.label.epic:OpenCart @allure.label.feature:AccountManagement @allure.label.story:ValidLogin @allure.label.severity:critical @master @sanity @regression @web', async ({
  4  |   homePage,
  5  |   loginPage,
  6  |   accountPage,
  7  | }) => {
  8  |   const email = process.env.APP_EMAIL;
  9  |   const password = process.env.APP_PASSWORD;
  10 | 
  11 |   if (!email || !password) {
  12 |     throw new Error('APP_EMAIL and APP_PASSWORD must be set in the .env file.');
  13 |   }
  14 | 
  15 |   await test.step('1) Navigate to the login page', async () => {
  16 |     // 1. Open My Account and choose Login.
  17 |     await homePage.clickMyAccount();
  18 |     await homePage.clickLogin();
  19 |     expect(await loginPage.isLoginPageExists()).toBeTruthy();
  20 |   });
  21 | 
  22 |   await test.step('2) Log in with configured customer credentials', async () => {
  23 |     // 2. Submit the configured credentials without logging them.
  24 |     await loginPage.login(email, password);
> 25 |     expect(await accountPage.isMyAccountPageExists()).toBeTruthy();
     |                                                       ^ Error: expect(received).toBeTruthy()
  26 |   });
  27 | 
  28 |   console.log('✅ Valid customer login completed.');
  29 | });
  30 | 
```