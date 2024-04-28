import { expect, test } from "vitest";
import axios from "axios";
import { registerUser } from "./register.test";

const HOST = "127.0.0.1";
const PORT = 3000;
const BASE_URL = `http://${HOST}:${PORT}/api`;

test("Fail parsing when empty username", async () => {
  const payload = {
    password: "asdlfkjlij",
  };

  await expect(() =>
    axios.post(`${BASE_URL}/login`, payload),
  ).rejects.toThrow();
});

test("Fail parsing when empty password", async () => {
  const payload = {
    username: "asdflkjlkjasdf",
  };

  await expect(() =>
    axios.post(`${BASE_URL}/login`, payload),
  ).rejects.toThrow();
});

test("Login successfully", async () => {
  const payload = {
    username: `TDD-username-${Math.random() * 100_000}`,
    password: `1234`,
  };

  await registerUser(payload);
  const response = await axios.post(`${BASE_URL}/login`, payload);

  expect(response).toBeDefined();
  expect(response.status).toBe(200);
});
