import axios from "axios";
import { beforeEach, describe, expect, test } from "vitest";
import { log } from "../../src/utils/log";
import { loginUser } from "../login.utils";
import { registerUser } from "../register.utils";
import { createBlog } from "./post.utils";
import { BLOG_DELETE_ENDPOINT } from "./delete.utils";

describe("Delete Blogs endpoint", () => {
  /**
   * @type {Object} adminUser
   * @property {string} adminUser.username
   * @property {string} adminUser.password
   */
  let adminUser;
  /**
   * @type {string} token
   */
  let token;

  beforeEach(async () => {
    const payload = {
      username: `TDD-username-${Math.random() * 100_000}`,
      password: `1234`,
    };

    await registerUser(payload);
    token = await loginUser(payload);

    adminUser = payload;
  });

  test("Fail parsing when empty token", async () => {
    const payload = {
      blogId: 1,
    };

    await expect(() =>
      axios.delete(BLOG_DELETE_ENDPOINT, payload),
    ).rejects.toThrow();
  });

  test("Fail parsing when empty blogId", async () => {
    const payload = {
      token: "asdflkjlkjasdf",
    };

    await expect(() =>
      axios.delete(BLOG_DELETE_ENDPOINT, payload),
    ).rejects.toThrow();
  });

  test("Fail request when invalid token", async () => {
    const payload = {
      token: "asdflkjlkjasdf",
      blogId: 5,
    };

    await expect(() =>
      axios.delete(BLOG_DELETE_ENDPOINT, payload),
    ).rejects.toThrow();
  });

  test("Blog deleted successfully", async () => {
    const blog = await createBlog(token, {
      title: "This blog should have been deleted!",
      content:
        "This blog is for testing if the API deletes blogs correctly! If you can see this, that means the API doesn't deletes correctly!",
    });

    const payload = {
      token,
      blogId: blog.id,
    };

    try {
      const response = await axios.delete(BLOG_DELETE_ENDPOINT, {
        method: "delete",
        data: payload,
      });
      expect(response).toBeDefined();
      expect(response.status).toBeDefined();
      expect(response.status).toEqual(200);

      expect(response.data).toBeDefined();
      expect(response.data).toEqual(payload.blogId);
    } catch (error) {
      log.error(`An error has occurred on the request: ${error}`);
      throw error.message;
    }
  });
});
