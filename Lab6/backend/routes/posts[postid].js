import express from 'express'
import { logEndpoint } from './lib.js'

const router = express.Router()

router.get('/posts/:postId', logEndpoint((req, res) => {
	res.status(200).send(`Listing post with ID: ${req.params.postId}`)
}))

router.put('/posts/:postId', logEndpoint((req, res) => {
	res.status(200).send({ postId: '12376476' })
}))

router.delete('/posts/:postId', logEndpoint((req, res) => {
	res.status(200).send({ postId: '12376476' })
}))

export default router
