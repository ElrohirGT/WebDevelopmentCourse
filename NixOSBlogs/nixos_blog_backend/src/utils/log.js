const pino = require("pino");
const log = pino();
const logger = require("pino-http")({
  logger: log,
});

module.exports = {
  log,
  logger,
};
