import { POOL, sessionIsValid } from "../../db/db.js";
import { log } from "../../utils/log.js";

/**
 * @typedef {Object} UpdateBlogRequest
 * @property {string} token - The token given when loggin in
 * @property {import('./post.js').Blog} blog - The blog with the info to update
 */

/**
 * @param {Object} body
 * @returns {{isInvalid: boolean, body: UpdateBlogRequest}}
 */
const parseRequest = (body) => {
  const isInvalid = !body.token
    || !body.blog
    || !body.blog.title
    || !body.blog.content
    || !body.blog.id;
  return { isInvalid, body };
};

export default async (req, res) => {
  log.info("Entering update blog route...");

  log.info("Parsing request body...");
  const { isInvalid, body } = parseRequest(req.body);
  const { blog, token } = body;
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
    if (!(await sessionIsValid(POOL, token))) {
      log.error("Invalid session! Login required...");
      res.status(401).send("Invalid session! Please login...");
      return;
    }
    log.info("Session is valid!");

    log.info("Updating blog post...");
    log.info(
      { banner: blog.banner?.slice(0, 10) },
      `Banner received: ${!!blog.banner}`,
    );
    const query = blog.banner
      ? "UPDATE blog SET title=$1, content=$2, banner=$3 WHERE id=$4 RETURNING *"
      : "UPDATE blog SET title=$1, content=$2, banner=DEFAULT WHERE id=$3 RETURNING *";
    const params = blog.banner
      ? [blog.title, blog.content, blog.banner, blog.id]
      : [blog.title, blog.content, blog.id];
    const response = await conn.query(query, params);

    if (response.rowCount < 1) {
      log.error("No blog post found to update!");
      res.status(400).send(`No blog post with id ${blog.id} found`);
      return;
    }
    log.info("Blog post updated!");

    res.send(response.rows[0]);
  } catch (error) {
    log.error(error, "An error ocurred!");
    res.status(500).send(error);
  } finally {
    conn?.release();
  }
};
