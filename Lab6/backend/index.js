import express from 'express'
import { logger, logMiddleware } from './routes/lib.js'
import notFoundRouter from './routes/notfound.js'
import postsRouter from './routes/posts.js'
import postIdRouter from './routes/posts[postid].js'
import unsupportedMethodsRouter from './routes/unsupported.js'
import 'dotenv/config.js'

const app = express()
const host = 'localhost'
const port = 3000
const docsHandler = express.static('static/docs/')

app.use(logMiddleware) // Log requests and responses
app.use(express.json()) // Parse JSON in the body
app.use(docsHandler)

app.get('/', (_req, res) => {
	res.send('Hello World!')
})

app.use(postsRouter)
app.use(postIdRouter)
app.use(unsupportedMethodsRouter)
app.use(notFoundRouter)

app.listen(port, host, () => {
	logger.info(`Example app listening on ${host}:${port}`)
})
