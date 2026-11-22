import { expect, test } from '@playwright/test';
import dotenv from 'dotenv';
import { Routes } from '../../api/endpoints/routes';
import { RandomDataUtil } from '../../utils/dataGenerator';

dotenv.config();

type Cart = {
  id: number;
  userId: number;
  date: string;
  products: { productId: number; quantity: number }[];
};

test.describe('FakeStore Carts API Tests', () => {
  // ---------------------------------------------------------
  // Configuration
  // ---------------------------------------------------------
  const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
  const CART_ID = Number(process.env.CART_ID ?? 1);
  const USER_ID = Number(process.env.USER_ID ?? 1);
  const PRODUCT_ID = Number(process.env.PRODUCT_ID ?? 1);
  const LIMIT = Number(process.env.LIMIT ?? 3);
  const START_DATE = process.env.START_DATE || '2019-12-10';
  const END_DATE = process.env.END_DATE || '2020-10-10';

  // ---------------------------------------------------------
  // GET - Carts
  // ---------------------------------------------------------
  test('GET - All carts @master @sanity @api @allure.label.layer:API', async ({ request }) => {
    const response = await request.get(`${BASE_URL}${Routes.GET_ALL_CARTS}`);
    expect(response.status(), 'All carts should return HTTP 200').toBe(200);

    const carts = await response.json() as Cart[];
    expect(Array.isArray(carts)).toBe(true);
    expect(carts.length, 'At least one cart should be returned').toBeGreaterThan(0);
    expect(carts[0].id).toEqual(expect.any(Number));
    expect(carts[0].userId).toEqual(expect.any(Number));
    expect(Array.isArray(carts[0].products)).toBe(true);
  });

  test('GET - Cart by ID @master @sanity @api @allure.label.layer:API', async ({ request }) => {
    const route = Routes.GET_CART_BY_ID.replace('{id}', String(CART_ID));
    const response = await request.get(`${BASE_URL}${route}`);
    expect(response.status(), 'A valid cart ID should return HTTP 200').toBe(200);

    const cart = await response.json() as Cart;
    expect(cart.id).toBe(CART_ID);
    expect(cart.userId).toEqual(expect.any(Number));
    expect(Array.isArray(cart.products)).toBe(true);
  });

  test('GET - Carts by date range @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const route = Routes.GET_CARTS_BY_DATE_RANGE
      .replace('{startdate}', START_DATE)
      .replace('{enddate}', END_DATE);
    const response = await request.get(`${BASE_URL}${route}`);
    expect(response.status(), 'Cart date filtering should return HTTP 200').toBe(200);

    const carts = await response.json() as Cart[];
    expect(Array.isArray(carts)).toBe(true);
    const start = Date.parse(`${START_DATE}T00:00:00.000Z`);
    const end = Date.parse(`${END_DATE}T23:59:59.999Z`);
    for (const cart of carts) {
      const cartDate = Date.parse(cart.date);
      expect(Number.isNaN(cartDate), 'Each cart should contain a valid date').toBe(false);
      expect(cartDate).toBeGreaterThanOrEqual(start);
      expect(cartDate).toBeLessThanOrEqual(end);
    }
  });

  test('GET - Carts by user @master @sanity @api @allure.label.layer:API', async ({ request }) => {
    const route = Routes.GET_USER_CART.replace('{userId}', String(USER_ID));
    const response = await request.get(`${BASE_URL}${route}`);
    expect(response.status(), 'User carts should return HTTP 200').toBe(200);

    const carts = await response.json() as Cart[];
    expect(Array.isArray(carts)).toBe(true);
    expect(carts.length, 'The configured user should have carts').toBeGreaterThan(0);
    expect(carts.every((cart) => cart.userId === USER_ID)).toBe(true);
  });

  test('GET - Carts with limit @master @sanity @api @allure.label.layer:API', async ({ request }) => {
    const route = Routes.GET_CARTS_WITH_LIMIT.replace('{limit}', String(LIMIT));
    const response = await request.get(`${BASE_URL}${route}`);
    expect(response.status(), 'Limited carts should return HTTP 200').toBe(200);

    const carts = await response.json() as Cart[];
    expect(Array.isArray(carts)).toBe(true);
    expect(carts.length, 'The API should honor the requested cart limit').toBe(LIMIT);
  });

  test('GET - Carts sorted ascending @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const route = Routes.GET_CARTS_SORTED.replace('{order}', 'asc');
    const response = await request.get(`${BASE_URL}${route}`);
    expect(response.status(), 'Ascending cart sort should return HTTP 200').toBe(200);

    const carts = await response.json() as Cart[];
    const ids = carts.map((cart) => cart.id);
    expect(ids.length).toBeGreaterThan(0);
    expect(ids).toEqual([...ids].sort((left, right) => left - right));
  });

  test('GET - Carts sorted descending @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const route = Routes.GET_CARTS_SORTED.replace('{order}', 'desc');
    const response = await request.get(`${BASE_URL}${route}`);
    expect(response.status(), 'Descending cart sort should return HTTP 200').toBe(200);

    const carts = await response.json() as Cart[];
    const ids = carts.map((cart) => cart.id);
    expect(ids.length).toBeGreaterThan(0);
    expect(ids).toEqual([...ids].sort((left, right) => right - left));
  });

  // ---------------------------------------------------------
  // POST - Create
  // ---------------------------------------------------------
  test('POST - Create cart @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const payload = RandomDataUtil.generateCartPayload(USER_ID);
    payload.products[0].productId = PRODUCT_ID;
    const response = await request.post(`${BASE_URL}${Routes.CREATE_CART}`, { data: payload });
    expect(response.status(), 'Cart creation should return HTTP 201').toBe(201);

    const created = await response.json() as Cart;
    expect(created.id).toEqual(expect.any(Number));
    expect(created.userId).toBe(USER_ID);
    expect(created.products).toEqual(payload.products);

    const cleanupRoute = Routes.DELETE_CART.replace('{id}', String(created.id));
    const cleanupResponse = await request.delete(`${BASE_URL}${cleanupRoute}`);
    expect(cleanupResponse.status(), 'The created cart should be cleaned up').toBe(200);
  });

  // ---------------------------------------------------------
  // PUT - Update
  // ---------------------------------------------------------
  test('PUT - Update cart @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const existingRoute = Routes.GET_CART_BY_ID.replace('{id}', String(CART_ID));
    const existingResponse = await request.get(`${BASE_URL}${existingRoute}`);
    expect(existingResponse.status(), 'The cart selected for update should exist').toBe(200);
    const existing = await existingResponse.json() as Cart;
    expect(existing.products.length).toBeGreaterThan(0);

    const payload = RandomDataUtil.generateUpdatedCartPayload(USER_ID);
    payload.products = [{
      productId: existing.products[0].productId,
      quantity: existing.products[0].quantity + 1,
    }];
    const route = Routes.UPDATE_CART.replace('{id}', String(CART_ID));
    const response = await request.put(`${BASE_URL}${route}`, { data: payload });
    expect(response.status(), 'Cart update should return HTTP 200').toBe(200);

    const updated = await response.json() as Cart;
    expect(updated.id).toBe(CART_ID);
    expect(updated.userId).toBe(USER_ID);
    expect(updated.products[0].productId).toBe(existing.products[0].productId);
    expect(updated.products[0].quantity).toBe(existing.products[0].quantity + 1);
  });

  // ---------------------------------------------------------
  // DELETE
  // ---------------------------------------------------------
  test('DELETE - Cart @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const route = Routes.DELETE_CART.replace('{id}', String(CART_ID));
    const response = await request.delete(`${BASE_URL}${route}`);
    expect(response.status(), 'Cart deletion should return HTTP 200').toBe(200);

    const deleted = await response.json() as Cart;
    expect(deleted.id).toBe(CART_ID);
  });
});
