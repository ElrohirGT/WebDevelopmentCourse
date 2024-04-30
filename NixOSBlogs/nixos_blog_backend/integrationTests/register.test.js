import axios from "axios";
import { describe, expect, test } from "vitest";
import { REGISTER_URL, registerUser } from "./register.utils";

describe("Register", () => {
  test("Fail parsing when empty username", async () => {
    const payload = {
      password: "asdlfkjlij",
    };

    await expect(() => axios.post(REGISTER_URL, payload)).rejects.toThrow();
  });

  test("Fail parsing when empty password", async () => {
    const payload = {
      username: "asdflkjlkjasdf",
    };

    await expect(() => axios.post(REGISTER_URL, payload)).rejects.toThrow();
  });

  test("Register successfully", async () => {
    const response = registerUser();
    expect(response).toBeDefined();
  });
});
