import { expect, test } from '@playwright/test';
import dotenv from 'dotenv';
import { Routes } from '../../api/endpoints/routes';
import { RandomDataUtil } from '../../utils/dataGenerator';

dotenv.config();

test.describe('FakeStore Authentication API Tests', () => {
  // ---------------------------------------------------------
  // Configuration
  // ---------------------------------------------------------
  const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
  const USER_ID = Number(process.env.USER_ID ?? 1);

  // ---------------------------------------------------------
  // POST - Login
  // ---------------------------------------------------------
  test('POST - Successful login @master @sanity @api @allure.label.layer:API', async ({ request }) => {
    // Load the current seed credentials rather than hard-coding them in the test.
    const userResponse = await request.get(
      `${BASE_URL}${Routes.GET_USER_BY_ID.replace('{id}', String(USER_ID))}`,
    );
    expect(userResponse.status(), 'A seeded FakeStore user should be available').toBe(200);

    const user = await userResponse.json() as { username: string; password: string };
    expect(user.username, 'The seeded user should have a username').toBeTruthy();
    expect(user.password, 'The seeded user should have a password').toBeTruthy();

    const response = await request.post(`${BASE_URL}${Routes.AUTH_LOGIN}`, {
      data: { username: user.username, password: user.password },
    });
    expect(response.status(), 'Valid credentials should return HTTP 201').toBe(201);

    const body = await response.json() as { token?: unknown };
    expect(typeof body.token, 'The login response should contain a token string').toBe('string');
    expect((body.token as string).length, 'The token should not be empty').toBeGreaterThan(0);
  });

  test('POST - Invalid login @master @regression @api @allure.label.layer:API', async ({ request }) => {
    const credentials = RandomDataUtil.generateInvalidLoginPayload();
    const response = await request.post(`${BASE_URL}${Routes.AUTH_LOGIN}`, { data: credentials });

    expect(response.status(), 'Invalid credentials should return HTTP 401').toBe(401);
    const errorMessage = await response.text();
    expect(errorMessage.trim(), 'The API should explain why authentication failed').toBe(
      'username or password is incorrect',
    );
  });
});
