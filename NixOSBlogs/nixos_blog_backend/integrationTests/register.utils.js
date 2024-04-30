import axios from "axios";
import { BASE_URL } from "./testUtils";

const REGISTER_URL = `${BASE_URL}/api/register`;

/**
 * Registers a user with the provided credentials.
 * It can also create a new user if no credentials are provided.
 *
 * @param {Object|null} payload
 * @param {string} payload.username
 * @param {string} payload.payload
 * @returns {Promise<{username: string, password: string}>} The username credentials.
 */
export async function registerUser(payload = undefined) {
  const requestBody = {
    username: payload?.username ?? `TDD-username-${Math.random() * 100_000}`,
    password: payload?.password ?? "1234",
  };

  await axios.post(REGISTER_URL, requestBody);

  return requestBody;
}
