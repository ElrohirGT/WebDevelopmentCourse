const POOL = require("../db/db.js");
const { log } = require("../utils/log.js");
const encryptPassword = require("../utils/encription.js");

/**
 * @typedef {Object} LoginRequestBody
 * @property {string} username
 * @property {string} password
 */

/**
 * A login request must have a username and a password.
 * @param {Object} body - Request body to check.
 * @returns {{isValid: Boolean, body: LoginRequestBody}} True if body is valid.
 */
const requestIsInvalid = (body) => {
  const isValid = !body.username || !body.password;
  return { isValid, body };
};

module.exports = async (req, res) => {
  log.info("Entering logging route...");

  log.info("Validating request body...");
  const { isValid, body } = requestIsInvalid(req.body);
  if (isValid) {
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
    log.info(result, "RETRIEVED:");

    if (result.rows.length <= 0) {
      log.error("User doesnt exists!");
      res.status(400).send("The user doesn't exists!");
      return;
    }

    // Here we would calculate a token and send it as a login parameter
    res.send();
  } catch (error) {
    log.error(`An error has ocurred: ${error}`);
    res.status(500).send(error);
  }
};
