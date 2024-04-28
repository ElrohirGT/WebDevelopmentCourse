const pino = require("pino");
const log = pino();
const logger = require("pino-http")({
  logger: log,
});

/**
 * Log module of the application.
 * Uses to log information to the console.
 * @module
 */
module.exports = {
  log,
  logger,
};
