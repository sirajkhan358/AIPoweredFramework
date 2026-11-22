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
};

type User = {
  id: number;
  email: string;
  username: string;
  name: { firstname: string; lastname: string };
  phone: string;
};

type Cart = {
  id: number;
  userId: number;
  products: { productId: number; quantity: number }[];
};

test.describe.serial('FakeStore API CRUD Workflows', () => {
  // ---------------------------------------------------------
  // Configuration
  // ---------------------------------------------------------
  const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
  const USER_ID = Number(process.env.USER_ID ?? 1);
  const PRODUCT_ID = Number(process.env.PRODUCT_ID ?? 1);

  // ---------------------------------------------------------
  // Product - Create, Update, Delete
  // ---------------------------------------------------------
  test('POST / PUT / DELETE - Product workflow @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const createPayload = RandomDataUtil.generateProductPayload();
    const createResponse = await request.post(`${BASE_URL}${Routes.CREATE_PRODUCT}`, { data: createPayload });
    expect(createResponse.status(), 'Product workflow create should return HTTP 201').toBe(201);

    const created = await createResponse.json() as Product;
    expect(created.id).toEqual(expect.any(Number));
    expect(created.title).toBe(createPayload.title);

    const updatePayload = RandomDataUtil.generateUpdatedProductPayload();
    const updateRoute = Routes.UPDATE_PRODUCT.replace('{id}', String(created.id));
    const updateResponse = await request.put(`${BASE_URL}${updateRoute}`, { data: updatePayload });
    expect(updateResponse.status(), 'Product workflow update should return HTTP 200').toBe(200);

    const updated = await updateResponse.json() as Product;
    expect(updated.id).toBe(created.id);
    expect(updated.title).toBe(updatePayload.title);
    expect(updated.price).toBe(updatePayload.price);

    const deleteRoute = Routes.DELETE_PRODUCT.replace('{id}', String(created.id));
    const deleteResponse = await request.delete(`${BASE_URL}${deleteRoute}`);
    expect(deleteResponse.status(), 'Product workflow delete should return HTTP 200').toBe(200);
  });

  // ---------------------------------------------------------
  // User - Create, Update, Delete
  // ---------------------------------------------------------
  test('POST / PUT / DELETE - User workflow @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const createPayload = RandomDataUtil.generateUserPayload();
    const createResponse = await request.post(`${BASE_URL}${Routes.CREATE_USER}`, { data: createPayload });
    expect(createResponse.status(), 'User workflow create should return HTTP 201').toBe(201);

    const created = await createResponse.json() as { id: number };
    expect(created.id).toEqual(expect.any(Number));

    const updatePayload = RandomDataUtil.generateUserUpdatePayload();
    const updateRoute = Routes.UPDATE_USER.replace('{id}', String(created.id));
    const updateResponse = await request.put(`${BASE_URL}${updateRoute}`, { data: updatePayload });
    expect(updateResponse.status(), 'User workflow update should return HTTP 200').toBe(200);

    const updated = await updateResponse.json() as Omit<User, 'id'>;
    expect(updated.username).toBe(updatePayload.username);
    expect(updated.email).toBe(updatePayload.email);
    expect(updated.name.firstname).toBe(updatePayload.name.firstname);
    expect(updated.name.lastname).toBe(updatePayload.name.lastname);

    const deleteRoute = Routes.DELETE_USER.replace('{id}', String(created.id));
    const deleteResponse = await request.delete(`${BASE_URL}${deleteRoute}`);
    expect(deleteResponse.status(), 'User workflow delete should return HTTP 200').toBe(200);
  });

  // ---------------------------------------------------------
  // Cart - Create, Update, Delete
  // ---------------------------------------------------------
  test('POST / PUT / DELETE - Cart workflow @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const createPayload = RandomDataUtil.generateCartPayload(USER_ID);
    createPayload.products[0].productId = PRODUCT_ID;
    const createResponse = await request.post(`${BASE_URL}${Routes.CREATE_CART}`, { data: createPayload });
    expect(createResponse.status(), 'Cart workflow create should return HTTP 201').toBe(201);

    const created = await createResponse.json() as Cart;
    expect(created.id).toEqual(expect.any(Number));
    expect(created.userId).toBe(USER_ID);
    expect(created.products).toEqual(createPayload.products);

    const updatePayload = RandomDataUtil.generateUpdatedCartPayload(USER_ID);
    updatePayload.products = [{
      productId: created.products[0].productId,
      quantity: created.products[0].quantity + 1,
    }];
    const updateRoute = Routes.UPDATE_CART.replace('{id}', String(created.id));
    const updateResponse = await request.put(`${BASE_URL}${updateRoute}`, { data: updatePayload });
    expect(updateResponse.status(), 'Cart workflow update should return HTTP 200').toBe(200);

    const updated = await updateResponse.json() as Cart;
    expect(updated.id).toBe(created.id);
    expect(updated.products[0].productId).toBe(created.products[0].productId);
    expect(updated.products[0].quantity).toBe(created.products[0].quantity + 1);

    const deleteRoute = Routes.DELETE_CART.replace('{id}', String(created.id));
    const deleteResponse = await request.delete(`${BASE_URL}${deleteRoute}`);
    expect(deleteResponse.status(), 'Cart workflow delete should return HTTP 200').toBe(200);
  });
});
