import { expect, test } from '@playwright/test';
import dotenv from 'dotenv';
import { Routes } from '../../api/endpoints/routes';
import { RandomDataUtil } from '../../utils/dataGenerator';

dotenv.config();

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
};

test.describe('FakeStore Products API Tests', () => {
  // ---------------------------------------------------------
  // Configuration
  // ---------------------------------------------------------
  const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
  const PRODUCT_ID = Number(process.env.PRODUCT_ID ?? 1);
  const LIMIT = Number(process.env.LIMIT ?? 3);
  const CATEGORY = 'electronics';

  // ---------------------------------------------------------
  // GET - Products
  // ---------------------------------------------------------
  test('GET - All products @master @sanity @api @allure.label.layer:API', async ({ request }) => {
    const response = await request.get(`${BASE_URL}${Routes.GET_ALL_PRODUCTS}`);
    expect(response.status(), 'All products should return HTTP 200').toBe(200);

    const products = await response.json() as Product[];
    expect(Array.isArray(products), 'The products response should be an array').toBe(true);
    expect(products.length, 'At least one product should be returned').toBeGreaterThan(0);
    expect(products[0].id).toEqual(expect.any(Number));
    expect(products[0].title).toEqual(expect.any(String));
    expect(products[0].price).toEqual(expect.any(Number));
    expect(products[0].category).toEqual(expect.any(String));
    expect(products[0].image).toEqual(expect.any(String));
  });

  test('GET - Product by ID @master @sanity @api @allure.label.layer:API', async ({ request }) => {
    const response = await request.get(
      `${BASE_URL}${Routes.GET_PRODUCT_BY_ID.replace('{id}', String(PRODUCT_ID))}`,
    );
    expect(response.status(), 'A valid product ID should return HTTP 200').toBe(200);

    const product = await response.json() as Product;
    expect(product.id).toBe(PRODUCT_ID);
    expect(product.title).toEqual(expect.any(String));
    expect(product.price).toEqual(expect.any(Number));
    expect(product.category).toEqual(expect.any(String));
    expect(product.image).toEqual(expect.any(String));
  });

  test('GET - Products with limit @master @sanity @api @allure.label.layer:API', async ({ request }) => {
    const route = Routes.GET_PRODUCTS_WITH_LIMIT.replace('{limit}', String(LIMIT));
    const response = await request.get(`${BASE_URL}${route}`);
    expect(response.status(), 'Limited products should return HTTP 200').toBe(200);

    const products = await response.json() as Product[];
    expect(Array.isArray(products)).toBe(true);
    expect(products.length, 'The API should honor the requested product limit').toBe(LIMIT);
  });

  test('GET - Products sorted ascending @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const route = Routes.GET_PRODUCTS_SORTED.replace('{order}', 'asc');
    const response = await request.get(`${BASE_URL}${route}`);
    expect(response.status(), 'Ascending product sort should return HTTP 200').toBe(200);

    const products = await response.json() as Product[];
    const ids = products.map((product) => product.id);
    expect(ids.length).toBeGreaterThan(0);
    expect(ids).toEqual([...ids].sort((left, right) => left - right));
  });

  test('GET - Products sorted descending @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const route = Routes.GET_PRODUCTS_SORTED.replace('{order}', 'desc');
    const response = await request.get(`${BASE_URL}${route}`);
    expect(response.status(), 'Descending product sort should return HTTP 200').toBe(200);

    const products = await response.json() as Product[];
    const ids = products.map((product) => product.id);
    expect(ids.length).toBeGreaterThan(0);
    expect(ids).toEqual([...ids].sort((left, right) => right - left));
  });

  test('GET - Product categories @master @sanity @api @allure.label.layer:API', async ({ request }) => {
    const response = await request.get(`${BASE_URL}${Routes.GET_ALL_CATEGORIES}`);
    expect(response.status(), 'Product categories should return HTTP 200').toBe(200);

    const categories = await response.json() as string[];
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length, 'At least one category should be returned').toBeGreaterThan(0);
    expect(categories.every((category) => typeof category === 'string')).toBe(true);
  });

  test('GET - Products by category @master @sanity @api @allure.label.layer:API', async ({ request }) => {
    const route = Routes.GET_PRODUCTS_BY_CATEGORY.replace('{category}', CATEGORY);
    const response = await request.get(`${BASE_URL}${route}`);
    expect(response.status(), 'Category products should return HTTP 200').toBe(200);

    const products = await response.json() as Product[];
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    expect(products.every((product) => product.category === CATEGORY)).toBe(true);
  });

  // ---------------------------------------------------------
  // POST - Create
  // ---------------------------------------------------------
  test('POST - Create product @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const payload = RandomDataUtil.generateProductPayload();
    const response = await request.post(`${BASE_URL}${Routes.CREATE_PRODUCT}`, { data: payload });
    expect(response.status(), 'Product creation should return HTTP 201').toBe(201);

    const created = await response.json() as Product;
    expect(created.id).toEqual(expect.any(Number));
    expect(created.title).toBe(payload.title);
    expect(created.price).toBe(payload.price);
    expect(created.description).toBe(payload.description);
    expect(created.category).toBe(payload.category);
    expect(created.image).toBe(payload.image);

    const cleanupRoute = Routes.DELETE_PRODUCT.replace('{id}', String(created.id));
    const cleanupResponse = await request.delete(`${BASE_URL}${cleanupRoute}`);
    expect(cleanupResponse.status(), 'The created product should be cleaned up').toBe(200);
  });

  // ---------------------------------------------------------
  // PUT - Update
  // ---------------------------------------------------------
  test('PUT - Update product @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const payload = RandomDataUtil.generateUpdatedProductPayload();
    const route = Routes.UPDATE_PRODUCT.replace('{id}', String(PRODUCT_ID));
    const response = await request.put(`${BASE_URL}${route}`, { data: payload });
    expect(response.status(), 'Product update should return HTTP 200').toBe(200);

    const updated = await response.json() as Product;
    expect(updated.id).toBe(PRODUCT_ID);
    expect(updated.title).toBe(payload.title);
    expect(updated.price).toBe(payload.price);
    expect(updated.description).toBe(payload.description);
    expect(updated.category).toBe(payload.category);
    expect(updated.image).toBe(payload.image);
  });

  // ---------------------------------------------------------
  // DELETE
  // ---------------------------------------------------------
  test('DELETE - Product @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const route = Routes.DELETE_PRODUCT.replace('{id}', String(PRODUCT_ID));
    const response = await request.delete(`${BASE_URL}${route}`);
    expect(response.status(), 'Product deletion should return HTTP 200').toBe(200);

    const deleted = await response.json() as Product;
    expect(deleted.id).toBe(PRODUCT_ID);
  });
});
