import axios from "axios";
import { BASE_URL } from "./testUtils";

export const LOGIN_URL = `${BASE_URL}/api/login`;

/**
 * Logins a user into the database.
 * This function doesn't create a user.
 * @param {Object} user
 * @param {string} user.username
 * @param {string} user.password
 * @returns {Promise<string>} The token of the user session
 */
export async function loginUser(user) {
  const response = await axios.post(LOGIN_URL, user);
  return response.data;
}
