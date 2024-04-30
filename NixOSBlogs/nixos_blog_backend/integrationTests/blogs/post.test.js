import axios from "axios";
import { beforeEach, describe, expect, test } from "vitest";
import { registerUser } from "../register.utils";
import { loginUser } from "../login.utils";
import { BLOG_POST_URL } from "./post.utils";

const BLOG_POST_URL = "";

describe("Post Blogs endpoint", () => {
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

    await expect(() => axios.post(BLOG_POST_URL, payload)).rejects.toThrow();
  });

  test("Fail parsing when empty title", async () => {
    const payload = {
      token: "asdflkjlkjasdf",
      content: "asdflkjlijelkjasdf",
    };

    await expect(() => axios.post(BLOG_POST_URL, payload)).rejects.toThrow();
  });

  test("Fail parsing when empty content", async () => {
    const payload = {
      token: "asdflkjlkjasdf",
      title: "asdflkjlasdfijlkj",
    };

    await expect(() => axios.post(BLOG_POST_URL, payload)).rejects.toThrow();
  });

  test("Fail parsing when invalid token", async () => {
    const payload = {
      token: "asdflkjlkjasdf",
      title: "asdflkjlasdfijlkj",
      content: "asdflkjlasdfijlkj",
    };

    await expect(() => axios.post(BLOG_POST_URL, payload)).rejects.toThrow();
  });

  test("Blog created successfully", async () => {
    const token = await loginUser(adminUser);

    const payload = {
      token,
      title: "Automatic integration test blog!",
      content: "This blog was created using an automated test!",
    };
    const response = await axios.post(BLOG_POST_URL, payload);

    expect(response).toBeDefined();
    expect(response.status).toBeDefined();
    expect(response.status).toEqual(200);

    expect(response.data).toBeDefined();
    expect(response.data.title).toBeDefined();
    expect(response.data.title).toEqual(payload.title);
    expect(response.data.content).toEqual(payload.content);
  });
});
