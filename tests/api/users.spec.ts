import { expect, test } from '@playwright/test';
import dotenv from 'dotenv';
import { Routes } from '../../api/endpoints/routes';
import { RandomDataUtil } from '../../utils/dataGenerator';

dotenv.config();

type User = {
  id: number;
  email: string;
  username: string;
  name: { firstname: string; lastname: string };
  phone: string;
};

test.describe('FakeStore Users API Tests', () => {
  // ---------------------------------------------------------
  // Configuration
  // ---------------------------------------------------------
  const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
  const USER_ID = Number(process.env.USER_ID ?? 1);
  const LIMIT = Number(process.env.LIMIT ?? 3);

  // ---------------------------------------------------------
  // GET - Users
  // ---------------------------------------------------------
  test('GET - All users @master @sanity @api @allure.label.layer:API', async ({ request }) => {
    const response = await request.get(`${BASE_URL}${Routes.GET_ALL_USERS}`);
    expect(response.status(), 'All users should return HTTP 200').toBe(200);

    const users = await response.json() as User[];
    expect(Array.isArray(users)).toBe(true);
    expect(users.length, 'At least one user should be returned').toBeGreaterThan(0);
    expect(users[0].id).toEqual(expect.any(Number));
    expect(users[0].email).toEqual(expect.any(String));
    expect(users[0].username).toEqual(expect.any(String));
  });

  test('GET - User by ID @master @sanity @api @allure.label.layer:API', async ({ request }) => {
    const route = Routes.GET_USER_BY_ID.replace('{id}', String(USER_ID));
    const response = await request.get(`${BASE_URL}${route}`);
    expect(response.status(), 'A valid user ID should return HTTP 200').toBe(200);

    const user = await response.json() as User;
    expect(user.id).toBe(USER_ID);
    expect(user.email).toEqual(expect.any(String));
    expect(user.username).toEqual(expect.any(String));
    expect(user.name.firstname).toEqual(expect.any(String));
    expect(user.name.lastname).toEqual(expect.any(String));
  });

  test('GET - Users with limit @master @sanity @api @allure.label.layer:API', async ({ request }) => {
    const route = Routes.GET_USERS_WITH_LIMIT.replace('{limit}', String(LIMIT));
    const response = await request.get(`${BASE_URL}${route}`);
    expect(response.status(), 'Limited users should return HTTP 200').toBe(200);

    const users = await response.json() as User[];
    expect(Array.isArray(users)).toBe(true);
    expect(users.length, 'The API should honor the requested user limit').toBe(LIMIT);
  });

  test('GET - Users sorted ascending @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const route = Routes.GET_USERS_SORTED.replace('{order}', 'asc');
    const response = await request.get(`${BASE_URL}${route}`);
    expect(response.status(), 'Ascending user sort should return HTTP 200').toBe(200);

    const users = await response.json() as User[];
    const ids = users.map((user) => user.id);
    expect(ids.length).toBeGreaterThan(0);
    expect(ids).toEqual([...ids].sort((left, right) => left - right));
  });

  test('GET - Users sorted descending @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const route = Routes.GET_USERS_SORTED.replace('{order}', 'desc');
    const response = await request.get(`${BASE_URL}${route}`);
    expect(response.status(), 'Descending user sort should return HTTP 200').toBe(200);

    const users = await response.json() as User[];
    const ids = users.map((user) => user.id);
    expect(ids.length).toBeGreaterThan(0);
    expect(ids).toEqual([...ids].sort((left, right) => right - left));
  });

  // ---------------------------------------------------------
  // POST - Create
  // ---------------------------------------------------------
  test('POST - Create user @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const payload = RandomDataUtil.generateUserPayload();
    const response = await request.post(`${BASE_URL}${Routes.CREATE_USER}`, { data: payload });
    expect(response.status(), 'User creation should return HTTP 201').toBe(201);

    const created = await response.json() as { id: number };
    expect(created.id, 'The API should return a generated user ID').toEqual(expect.any(Number));

    const cleanupRoute = Routes.DELETE_USER.replace('{id}', String(created.id));
    const cleanupResponse = await request.delete(`${BASE_URL}${cleanupRoute}`);
    expect(cleanupResponse.status(), 'The created user should be cleaned up').toBe(200);
  });

  // ---------------------------------------------------------
  // PUT - Update
  // ---------------------------------------------------------
  test('PUT - Update user @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const payload = RandomDataUtil.generateUserUpdatePayload();
    const route = Routes.UPDATE_USER.replace('{id}', String(USER_ID));
    const response = await request.put(`${BASE_URL}${route}`, { data: payload });
    expect(response.status(), 'User update should return HTTP 200').toBe(200);

    const updated = await response.json() as Omit<User, 'id'>;
    expect(updated.username).toBe(payload.username);
    expect(updated.email).toBe(payload.email);
    expect(updated.name.firstname).toBe(payload.name.firstname);
    expect(updated.name.lastname).toBe(payload.name.lastname);
    expect(updated.phone).toBe(payload.phone);
  });

  // ---------------------------------------------------------
  // DELETE
  // ---------------------------------------------------------
  test('DELETE - User @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const route = Routes.DELETE_USER.replace('{id}', String(USER_ID));
    const response = await request.delete(`${BASE_URL}${route}`);
    expect(response.status(), 'User deletion should return HTTP 200').toBe(200);

    const deleted = await response.json() as User;
    expect(deleted.id).toBe(USER_ID);
  });
});
