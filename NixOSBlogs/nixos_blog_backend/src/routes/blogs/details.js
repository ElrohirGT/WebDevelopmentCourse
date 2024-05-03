import { POOL } from "../../db/db.js";
import { log } from "../../utils/log.js";

export default async (req, res) => {
  log.info("Entering get blog detail route...");

  log.info("Parsing blog id...");
  const { blogId } = req.params;
  log.info("Blog Id parsed!");

  log.info("Getting blog details...");
  try {
    const result = await POOL.query(
      "SELECT id, title, banner, published, content FROM blog WHERE id=$1",
      [blogId],
    );

    if (result.rowCount < 1) {
      log.error({ blogId }, "No blog post found with the given id!");
      res.send(400).send("No blog found");
      return;
    }

    log.info({ blogId }, "Blog post obtained!");

    res.send(result.rows[0]);
  } catch (error) {
    log.error(`An error has ocurred: ${error}`);
    res.status(500).send(error);
  }
};
