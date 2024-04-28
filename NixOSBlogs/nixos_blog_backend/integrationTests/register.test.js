import { expect, test } from "vitest";
import axios from "axios";

const HOST = "127.0.0.1";
const PORT = 3000;
const BASE_URL = `http://${HOST}:${PORT}/api/register`;

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

test("Register successfully", async () => {
  const payload = {
    username: `TDD-username-${Math.random() * 100_000}`,
    password: `1234`,
  };

  const response = await axios.post(BASE_URL, payload);

  expect(response).toBeDefined();
});

/**
 * Registers a user with the provided credentials.
 * It can also create a new user if no credentials are provided.
 *
 * @param {Object|null} payload
 * @param {string} payload.username
 * @param {string} payload.payload
 * @returns {{username: string, password: string}} The username credentials.
 */
export async function registerUser(payload = null) {
  const requestBody = {
    username: payload?.username ?? `TDD-username-${Math.random() * 100_000}`,
    password: payload?.password ?? "1234",
  };

  await axios.post(BASE_URL, requestBody);

  return requestBody;
}
