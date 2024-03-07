import pino from 'pino'
import pinoHTTP from 'pino-http'

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
