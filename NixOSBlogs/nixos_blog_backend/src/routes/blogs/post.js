import { POOL, sessionIsValid } from "../../db/db.js";
import { log } from "../../utils/log.js";

/**
 * @typedef {Object} PostBlogRequest
 * @property {string} token - The token given when logging in
 * @property {string} title
 * @property {string} content
 * @property {string|null} banner
 */

/**
 * @typedef {Object} Blog
 * @property {number} id
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

export default async (req, res) => {
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
    log.info("Connection established!");

    log.info("Checking if session is valid...");
    if (!(await sessionIsValid(POOL, body.token))) {
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
    const response = await conn.query(query, params);

    if (response.rowCount < 1) {
      log.error("Blog couldn't be inserted!");
      res.status(500).send("The blog was not inserted!");
      return;
    }

    res.send(response.rows[0]);
  } catch (error) {
    log.error(error, "An error has ocurred!");
    res.status(500).send(error);
  } finally {
    conn?.release();
  }
};
