import axios from "axios";
import { beforeEach, describe, expect, test } from "vitest";
import { registerUser } from "../register.test";
import { loginUser } from "../login.test";

const HOST = "127.0.0.1";
const PORT = 3000;
const BASE_URL = `http://${HOST}:${PORT}/api/blogs`;

describe("blogs", () => {
  /**
   * @type {Object} adminUser
   * @property {string} adminUser.username
   * @property {string} adminUser.password
   */
  let adminUser;

  beforeEach(async () => {
    const payload = {
      username: `TDD-username-${Math.random() * 100_000}`,
      password: `1234`,
    };

    await registerUser(payload);

    adminUser = payload;
  });

  test("Fail parsing when empty token", async () => {
    const payload = {
      title: "asdlfkjliajsdf",
      content: "asdflkjlijelkjasdf",
    };

    await expect(() => axios.post(BASE_URL, payload)).rejects.toThrow();
  });

  test("Fail parsing when empty title", async () => {
    const payload = {
      token: "asdflkjlkjasdf",
      content: "asdflkjlijelkjasdf",
    };

    await expect(() => axios.post(BASE_URL, payload)).rejects.toThrow();
  });

  test("Fail parsing when empty content", async () => {
    const payload = {
      token: "asdflkjlkjasdf",
      title: "asdflkjlasdfijlkj",
    };

    await expect(() => axios.post(BASE_URL, payload)).rejects.toThrow();
  });

  test("Blog created successfully", async () => {
    const token = await loginUser(adminUser);
    console.log("The login token is: ", token);

    const payload = {
      token,
      title: "Automatic integration test blog!",
      content: "This blog was created using an automated test!",
    };
    const response = await axios.post(BASE_URL, payload);

    expect(response).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);

    expect(response.data).toBeDefined();
    expect(response.data.title).toBeDefined();
    expect(response.data.title).toEqual(payload.title);
    expect(response.data.content).toEqual(payload.content);
  });
});

/**
 * Create a blog with the specified session token.
 *
 * @param {string} token
 * @param {Object} blog
 * @param {string} blog.title
 * @param {string} blog.content
 * @param {string|null} blog.banner
 * @returns {Promise<Blog>} The blog created
 */
export async function createBlog(token, blog) {
  const payload = {
    token,
    ...blog,
  };

  const response = await axios.post(BASE_URL, payload);

  return response.data;
}
