import express from 'express'
import pino from 'pino-http'
import postsRouter from './routes/posts.js'
import postIdRouter from './routes/posts[postid].js'

const app = express(pino)
const host = 'localhost'
const port = 3000

app.use(pino())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(postsRouter)
app.use(postIdRouter)

app.listen(port, host, () => {
  console.log(`Example app listening on ${host}:${port}`)
})
