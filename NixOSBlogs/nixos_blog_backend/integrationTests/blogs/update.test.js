import axios from "axios";
import { beforeEach, describe, expect, test } from "vitest";
import { log } from "../../src/utils/log";
import { loginUser } from "../login.utils";
import { registerUser } from "../register.utils";
import { createBlog } from "./post.utils";
import { BLOG_UPDATE_ENDPOINT } from "./update.utils";

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

    await expect(() => axios.put(BLOG_UPDATE_ENDPOINT, payload)).rejects.toThrow();
  });

  test("Fail parsing when empty blog", async () => {
    const payload = {
      token: "asdflkjlkjasdf",
    };

    await expect(() => axios.post(BLOG_UPDATE_ENDPOINT, payload)).rejects.toThrow();
  });

  test("Fail parsing when empty blogs properties", async () => {
    const payload = {
      token: "asdflkjlkjasdf",
      blog: {},
    };

    await expect(() => axios.post(BLOG_UPDATE_ENDPOINT, payload)).rejects.toThrow();
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

    await expect(() => axios.post(BLOG_UPDATE_ENDPOINT, payload)).rejects.toThrow();
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
      const response = await axios.put(BLOG_UPDATE_ENDPOINT, payload);
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
