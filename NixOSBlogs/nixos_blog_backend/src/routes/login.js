const POOL = require("../db/db.js");
const { log } = require("../utils/log.js");

const requestIsInvalid = (body) => {
  return !body.username || !body.password;
};

module.exports = (req, res) => {
  log.info("Entering logging route...");

  log.info("Validating request body...");
  if (requestIsInvalid(req.body)) {
    log.error("Invalid request body!");
    res.status(400).send("The request body is invalid!");
    return;
  }
  log.info("The request body is valid!");

  res.send("");
};
