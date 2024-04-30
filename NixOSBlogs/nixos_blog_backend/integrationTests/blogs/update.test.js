import axios from "axios";
import { beforeEach, describe, expect, test } from "vitest";
import { registerUser } from "../register.utils.js";
import { loginUser } from "../login.utils.js";
import { createBlog } from "./post.utils.js";
import { log } from "../../src/utils/log.js";

const HOST = "127.0.0.1";
const PORT = 3000;
const BASE_URL = `http://${HOST}:${PORT}/api/blogs`;

describe("Update Blogs endpoint", () => {
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
      blog: {
        title: "asdlfkj",
        content: "asdlfkj",
        id: "asdlfkj",
      },
    };

    await expect(() => axios.put(BASE_URL, payload)).rejects.toThrow();
  });

  test("Fail parsing when empty blog", async () => {
    const payload = {
      token: "asdflkjlkjasdf",
    };

    await expect(() => axios.post(BASE_URL, payload)).rejects.toThrow();
  });

  test("Fail parsing when empty blogs properties", async () => {
    const payload = {
      token: "asdflkjlkjasdf",
      blog: {},
    };

    await expect(() => axios.post(BASE_URL, payload)).rejects.toThrow();
  });

  test("Fail request when invalid token", async () => {
    const payload = {
      token: "asdflkjlkjasdf",
      blog: {
        title: "asdlfkj",
        content: "asdlfkj",
        id: "asdlfkj",
      },
    };

    await expect(() => axios.post(BASE_URL, payload)).rejects.toThrow();
  });

  test("Blog updated successfully", async () => {
    const token = await loginUser(adminUser);
    const blog = await createBlog(token, {
      title: "This title must have changed!",
      content: "This blog is for testing if the API updates blogs correctly!",
    });

    const payload = {
      token,
      blog: {
        ...blog,
        title: "The title was changed!",
      },
    };

    try {
      const response = await axios.put(BASE_URL, payload);
      expect(response).toBeDefined();
      expect(response.status).toBeDefined();
      expect(response.status).toEqual(200);

      expect(response.data).toBeDefined();
      expect(response.data.title).toBeDefined();
      expect(response.data.title).toEqual(payload.blog.title);
      expect(response.data.content).toBeDefined();
      expect(response.data.content).toEqual(payload.blog.content);
    } catch (error) {
      log.error(`An error has occurred on the request: ${error}`);
      throw error.message;
    }
  });
});

/**
 * Updates a blog with the specified session token.
 *
 * @param {string} token
 * @param {Object} blog
 * @param {number} blog.id
 * @param {string} blog.title
 * @param {string} blog.content
 * @param {string|null} blog.banner
 * @returns {Promise<Blog>} The blog created
 */
export async function updateBlog(token, blog) {
  const payload = {
    token,
    blog,
  };

  const response = await axios.put(BASE_URL, payload);

  return response.data;
}
