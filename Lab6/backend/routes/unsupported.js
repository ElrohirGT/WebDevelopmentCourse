import express from 'express'
import { logger } from './lib.js'

const router = express.Router()

const notSupportedHTTPMethodHandler = (method) => (_req, res) => {
  const msg = `[${method}] Method not supported!`
  logger.error(msg)
  res.status(501).send(msg)
}

router.connect('/*', notSupportedHTTPMethodHandler('CONNECT'))
router.options('/*', notSupportedHTTPMethodHandler('CONNECT'))
router.trace('/*', notSupportedHTTPMethodHandler('CONNECT'))
router.patch('/*', notSupportedHTTPMethodHandler('PATCH'))

export default router
