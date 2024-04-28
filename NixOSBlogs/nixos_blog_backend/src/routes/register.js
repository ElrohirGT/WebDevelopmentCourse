import { POOL } from "../db/db.js";
import { log } from "../utils/log.js";
import encryptPassword from "../utils/encription.js";

/**
 * @typedef {Object} RegisterRequestBody
 * @property {string} username
 * @property {string} password
 */

/**
 * A register request must have a username and a password.
 * @param {Object} body - Request body to check.
 * @returns {{isInvalid: Boolean, body: RegisterRequestBody}} True if body is valid.
 */
const requestIsInvalid = (body) => {
  const isInvalid = !body.username || !body.password;
  return { isInvalid, body };
};

export default async (req, res) => {
  log.info("Entering the register route...");

  log.info("Validating request body...");
  const { isInvalid, body } = requestIsInvalid(req.body);
  if (isInvalid) {
    log.error("Invalid request body!");
    res.status(400).send("The request body is invalid!");
    return;
  }
  log.info("The request body is valid!");

  log.info("Connecting to DB...");
  let conn;
  try {
    conn = await POOL.connect();
    log.info("Connection established!");

    log.info("Starting transaction...");
    await conn.query("BEGIN");

    await conn.query(
      "INSERT INTO blog_admin (username, password) VALUES ($1, $2)",
      [body.username, encryptPassword(body.password)],
    );

    await conn.query("COMMIT");
    res.send();
  } catch (error) {
    await conn?.query("ROLLBACK");

    log.error(`An error ocurred while connecting to the DB! ${error}`);
    res.status(500).send("An error ocurred while connecting to the DB!");
  } finally {
    conn?.release();
  }
};
