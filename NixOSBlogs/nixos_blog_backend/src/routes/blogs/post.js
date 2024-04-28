const { response } = require("express");
const POOL = require("../../db/db.js");
const { log } = require("../../utils/log.js");

/**
 * @typedef {Object} PostBlogRequest
 * @property {string} token - The token given when logging in
 * @property {string} title
 * @property {string} content
 * @property {string|null} banner
 */

/**
 * @typedef {Object} Blog
 * @property {string} title
 * @property {string} banner
 * @property {string} content
 * @property {string} published
 */

/**
 * @param {Object} body
 * @returns {{isInvalid: boolean, body: PostBlogRequest}}
 */
const parseRequest = (body) => {
  const isInvalid = !body.title || !body.content || !body.token;
  return { isInvalid, body };
};

module.exports = async (req, res) => {
  log.info("Entering post blog route...");

  log.info("Parsing request body...");
  const { isInvalid, body } = parseRequest(req.body);
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
    log.info("Connection established...");

    log.info("Checking if session is valid...");
    const now = new Date();
    const twoDaysInMS = 2 * 24 * 60 * 60 * 1000;
    const twoDaysAgo = new Date(now.getTime() - twoDaysInMS);
    log.info({ now, twoDaysAgo }, "Dates to check");

    let response = await conn.query(
      "SELECT true FROM sesion WHERE token=$1 AND start BETWEEN $2 AND $3",
      [body.token, twoDaysAgo, now],
    );

    if (response.rowCount < 1) {
      log.error("No valid session found! Log in required!");
      res.status(401).send("Invalid session! Login first...");
      return;
    }
    log.info("Session is valid!");

    log.info("Inserting blog...");
    const query = body.banner
      ? "INSERT INTO blog (title, content, banner) VALUES ($1,$2,$3) RETURNING *"
      : "INSERT INTO blog (title, content) VALUES ($1,$2) RETURNING *";
    const params = body.banner
      ? [body.title, body.content, body.banner]
      : [body.title, body.content];
    response = await conn.query(query, params);

    if (response.rowCount < 1) {
      log.error("Blog couldn't be inserted!");
      res.status(500).send("The blog was not inserted!");
      return;
    }

    res.send(response.rows[0]);
  } catch (error) {
    log.error(`An error has ocurred: ${error}`);
    res.status(500).send(error);
  } finally {
    conn?.release();
  }
};
