import { beforeEach, describe, expect, test } from "vitest";
import { registerUser } from "../register.utils";
import { loginUser } from "../login.utils";
import { createBlog } from "./post.utils";
import axios from "axios";
import { BASE_URL } from "../testUtils";

describe("Blog details endpoint", () => {
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

  /**
   * @type {import("../../src/routes/blogs/post").Blog}
   */
  let blog;

  beforeEach(async () => {
    const payload = {
      username: `TDD-username-${Math.random() * 100_000}`,
      password: `1234`,
    };

    await registerUser(payload);
    adminUser = payload;

    token = await loginUser(payload);

    blog = await createBlog(token, {
      title: "Test Blog for details endpoint!",
      content: "# Test Blog for details endpoint!",
    });
  });

  test("Get blog details works!", async () => {
    const { id } = blog;
    const response = await axios.get(`${BASE_URL}/api/blogs/${id}`);

    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
  });
});
