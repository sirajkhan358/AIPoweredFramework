import { expect, test } from '@playwright/test';
import dotenv from 'dotenv';
import Ajv from 'ajv';
import path from 'path';
import { Routes } from '../../api/endpoints/routes';
import { DataProvider } from '../../utils/DataReader';

dotenv.config();

const ajv = new Ajv();
const productSchema = DataProvider.readJson(
  path.resolve(__dirname, '../../api/schemas/product_api_schema.json'),
);
const userSchema = DataProvider.readJson(
  path.resolve(__dirname, '../../api/schemas/user_api_schema.json'),
);
const cartSchema = DataProvider.readJson(
  path.resolve(__dirname, '../../api/schemas/cart_api_schema.json'),
);

test.describe('FakeStore API Schema Tests', () => {
  // ---------------------------------------------------------
  // Configuration
  // ---------------------------------------------------------
  const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
  const PRODUCT_ID = Number(process.env.PRODUCT_ID ?? 1);
  const USER_ID = Number(process.env.USER_ID ?? 1);
  const CART_ID = Number(process.env.CART_ID ?? 1);

  // ---------------------------------------------------------
  // GET - Schema validation
  // ---------------------------------------------------------
  test('GET - Product response schema @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const route = Routes.GET_PRODUCT_BY_ID.replace('{id}', String(PRODUCT_ID));
    const response = await request.get(`${BASE_URL}${route}`);
    expect(response.status(), 'Product schema source should return HTTP 200').toBe(200);

    const body = await response.json();
    const validate = ajv.compile(productSchema);
    const isValid = validate(body);
    expect(isValid, `Product schema errors: ${ajv.errorsText(validate.errors)}`).toBe(true);
  });

  test('GET - User response schema @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const route = Routes.GET_USER_BY_ID.replace('{id}', String(USER_ID));
    const response = await request.get(`${BASE_URL}${route}`);
    expect(response.status(), 'User schema source should return HTTP 200').toBe(200);

    const body = await response.json();
    const validate = ajv.compile(userSchema);
    const isValid = validate(body);
    expect(isValid, `User schema errors: ${ajv.errorsText(validate.errors)}`).toBe(true);
  });

  test('GET - Cart response schema @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const route = Routes.GET_CART_BY_ID.replace('{id}', String(CART_ID));
    const response = await request.get(`${BASE_URL}${route}`);
    expect(response.status(), 'Cart schema source should return HTTP 200').toBe(200);

    const body = await response.json();
    const validate = ajv.compile(cartSchema);
    const isValid = validate(body);
    expect(isValid, `Cart schema errors: ${ajv.errorsText(validate.errors)}`).toBe(true);
  });
});
