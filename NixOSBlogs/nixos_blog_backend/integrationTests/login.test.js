import axios from "axios";
import { expect, test } from "vitest";
import { registerUser } from "./register.test";

const HOST = "127.0.0.1";
const PORT = 3000;
const BASE_URL = `http://${HOST}:${PORT}/api/login`;

test("Fail parsing when empty username", async () => {
  const payload = {
    password: "asdlfkjlij",
  };

  await expect(() => axios.post(BASE_URL, payload)).rejects.toThrow();
});

test("Fail parsing when empty password", async () => {
  const payload = {
    username: "asdflkjlkjasdf",
  };

  await expect(() => axios.post(BASE_URL, payload)).rejects.toThrow();
});

test("Login successfully", async () => {
  const payload = {
    username: `TDD-username-${Math.random() * 100_000}`,
    password: `1234`,
  };

  await registerUser(payload);
  const response = await axios.post(BASE_URL, payload);

  expect(response).toBeDefined();
  expect(response.status).toBe(200);

  expect(response.data).toBeDefined();
  expect(response.data).toBeTypeOf("string");
});

/**
 * Logins a user into the database.
 * This function doesn't create a user.
 * @param {Object} user
 * @param {string} user.username
 * @param {string} user.password
 * @returns {Promise<string>} The token of the user session
 */
export async function loginUser(user) {
  const response = await axios.post(BASE_URL, user);
  return response.data;
}
