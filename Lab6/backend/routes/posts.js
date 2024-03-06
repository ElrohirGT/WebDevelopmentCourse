import express from 'express'
import logger from 'pino-http'
import { logEndpoint } from './lib.js'

const router = express.Router()

router.get('/posts', logEndpoint((req, res) => {
	logger(req, res)
	res.status(200).send('Lists posts!')
}))

router.post('/posts', logEndpoint((req, res) => {
	logger(req, res)
	res.status(200).send({ postId: '1236454' })
}))

export default router
