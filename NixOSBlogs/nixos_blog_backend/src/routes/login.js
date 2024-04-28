const POOL = require("../db/db.js");
const { log } = require("../utils/log.js");

module.exports = (req, res) => {
  log.info("Entering logging route...");
  res.send("Hello World!");
};
