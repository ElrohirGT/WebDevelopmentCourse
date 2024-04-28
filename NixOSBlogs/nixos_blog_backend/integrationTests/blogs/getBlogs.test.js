import axios from "axios";
import { expect, test } from "vitest";

const HOST = "127.0.0.1";
const PORT = 3000;
const BASE_URL = `http://${HOST}:${PORT}/api`;

test("This test should fail!", async () => {
  throw "This is a dummy exception!";
});
