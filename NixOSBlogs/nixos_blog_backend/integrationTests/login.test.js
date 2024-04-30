import axios from "axios";
import { describe, expect, test } from "vitest";
import { registerUser } from "./register.utils";
import { LOGIN_URL } from "./login.utils";

describe("Login", () => {
  test("Fail parsing when empty username", async () => {
    const payload = {
      password: "asdlfkjlij",
    };

    await expect(() => axios.post(LOGIN_URL, payload)).rejects.toThrow();
  });

  test("Fail parsing when empty password", async () => {
    const payload = {
      username: "asdflkjlkjasdf",
    };

    await expect(() => axios.post(LOGIN_URL, payload)).rejects.toThrow();
  });

  test("Login successfully", async () => {
    const payload = {
      username: `TDD-username-${Math.random() * 100_000}`,
      password: `1234`,
    };

    await registerUser(payload);
    const response = await axios.post(LOGIN_URL, payload);

    expect(response).toBeDefined();
    expect(response.status).toBe(200);

    expect(response.data).toBeDefined();
    expect(response.data).toBeTypeOf("string");
  });
});
