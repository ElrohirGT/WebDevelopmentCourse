import { POOL, sessionIsValid } from "../../db/db.js";
import { log } from "../../utils/log.js";

/**
 * @typedef {Object} DeleteBlogRequest
 * @property {string} token
 * @property {number} blogId
 */

/**
 * @param {*} body
 * @returns {{isInvalid: boolean, body: DeleteBlogRequest}}
 */
const parseRequestBody = (body) => {
  const isInvalid = !body.token || !body.blogId;
  return { isInvalid, body };
};

export default async (req, res) => {
  log.info("Entering delete request...");

  log.info("Parsing body request...");
  const { isInvalid, body } = parseRequestBody(req.body);
  if (isInvalid) {
    log.error("Request body is invalid!");
    res.status(400).send("The request body is invalid!");
    return;
  }
  log.info("Request body parsed!");

  log.info("Connecting to DB...");
  let conn;
  try {
    conn = await POOL.connect();
    log.info("Connection established!");

    log.info("Checking if session is valid...");
    if (!(await sessionIsValid(POOL, body.token))) {
      log.error("Invalid session! Login required...");
      res.status(401).send("Invalid session! Please login...");
      return;
    }
    log.info("Session is valid!");

    log.info({ blogId: body.blogId }, "Deleting blogs with id!");
    const response = await conn.query("DELETE FROM blog WHERE id=$1", [
      body.blogId,
    ]);
    log.info({ blogsDeleted: response.rowCount }, "Blogs deleted!");

    res.status(200).send(`${body.blogId}`);
  } catch (error) {
    log.error(error, "An error has ocurred while trying to delete blog!");
    res.status(500).send(error);
  } finally {
    conn?.release();
  }
};
