const POOL = require("../../db/db.js");
const { log } = require("../../utils/log.js");

module.exports = async (req, res) => {
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
