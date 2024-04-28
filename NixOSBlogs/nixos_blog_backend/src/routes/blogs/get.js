import { POOL } from "../../db/db.js";
import { log } from "../../utils/log.js";

export default async (req, res) => {
  log.info("Entering get blogs route...");

  log.info("Getting blog posts...");
  try {
    const result = await POOL.query(
      "SELECT id, title, banner, published FROM blog",
    );
    log.info(`${result.rows.length} Blog posts obtained!`);

    res.send(result.rows);
  } catch (error) {
    log.error(`An error has ocurred: ${error}`);
    res.status(500).send(error);
  }
};
