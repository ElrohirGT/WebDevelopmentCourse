import { v4 as uuidv4 } from "uuid";
import { POOL } from "../db/db.js";
import encryptPassword from "../utils/encription.js";
import { log } from "../utils/log.js";

/**
 * @typedef {Object} LoginRequestBody
 * @property {string} username
 * @property {string} password
 */

/**
 * A login request must have a username and a password.
 * @param {Object} body - Request body to check.
 * @returns {{isInvalid: Boolean, body: LoginRequestBody}} True if body is valid.
 */
const requestIsInvalid = (body) => {
  const isInvalid = !body.username || !body.password;
  return { isInvalid, body };
};

export default async (req, res) => {
  log.info("Entering logging route...");

  log.info("Validating request body...");
  const { isInvalid, body } = requestIsInvalid(req.body);
  if (isInvalid) {
    log.error("Invalid request body!");
    res.status(400).send("The request body is invalid!");
    return;
  }
  log.info("The request body is valid!");

  log.info("Checking if user exists...");
  try {
    const encryptedPassword = encryptPassword(body.password);
    const result = await POOL.query(
      "SELECT * FROM blog_admin WHERE username=$1 AND password=$2 LIMIT 1",
      [body.username, encryptedPassword],
    );

    if (result.rows.length <= 0) {
      log.error("User doesnt exists!");
      res.status(400).send("The user doesn't exists!");
      return;
    }
    log.info("Correct credentials!");

    log.info("Creating session...");

    const token = uuidv4();
    await POOL.query("INSERT INTO sesion (token, username) VALUES ($1,$2)", [
      token,
      body.username,
    ]);

    res.send(token);
  } catch (error) {
    log.error(`An error has ocurred: ${error}`);
    res.status(500).send(error);
  }
};
