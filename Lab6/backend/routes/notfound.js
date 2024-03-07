import express from 'express'
import { logger } from './lib.js'

const router = express.Router()

const notFoundRouteHandler = (method) => (req, res) => {
  const msg = `[${method}:${req.originalUrl}] not found`
  logger.error(msg)
  res.status(404).send('not found')
}

router.get('/*', notFoundRouteHandler('GET'))
router.post('/*', notFoundRouteHandler('POST'))
router.put('/*', notFoundRouteHandler('PUT'))
router.delete('/*', notFoundRouteHandler('DELETE'))

export default router
