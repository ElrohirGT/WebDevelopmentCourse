import pino from "pino";
import pinoLogger from "pino-http";

export const log = pino();
export const logger = pinoLogger({
  logger: log,
});
