import pino from 'pino'
import pinoHTTP from 'pino-http'

/**
 * Checks if a string is null or undefined
 */
export const isNullOrUndefined = (str) => (typeof str === 'undefined' || str === null)
/**
 * Checks if a string is _truthy_ and not empty
 */
export const isTruthyAndNotEmpty = (str) => !isNullOrUndefined(str) && !str.isEmpty()

export const logMiddleware = pinoHTTP({
  logger: pino(),

  customLogLevel(_req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn'
    }
    if (res.statusCode >= 500 || err) {
      return 'error'
    }
    if (res.statusCode >= 300 && res.statusCode < 400) {
      return 'silent'
    }
    return 'info'
  },
})

export const { logger } = logMiddleware
