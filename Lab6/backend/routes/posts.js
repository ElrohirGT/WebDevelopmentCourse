import express from 'express'
import DB_POOL from './db.js'
import URL_SEP from './lib.js'

const router = express.Router()

router.get('/posts', async (req, res) => {
  try {
    req.log.info('Obtaining posts from DB...')
    const query = `
SELECT blog_id, title, banner, content, created_at, (SELECT STRING_AGG(url, '${URL_SEP}') FROM external_links WHERE blog_id = b.blog_id) as external_links
FROM blog_posts b`

    const result = await DB_POOL.query(query)
    res.log.info('Obtained posts from DB!')

    res.status(200).send(result.rows)
  } catch (e) {
    req.log.error(e)
    res.status(500).send('Internal server error')
  }
})

const reqIsValid = (body) => (!!body?.title) && (!!body?.content)

router.post('/posts', async (req, res) => {
  req.log.info('Creating a new post...')

  req.log.info('Checking if request is valid...')
  if (!reqIsValid(req.body)) {
    req.log.error('Request is invalid!')
    res.status(400).send('Invalid request, remember to send a title and a content')
    return
  }
  req.log.info('Request is valid!')

  req.log.info('Inserting into DB...')
  const query = 'INSERT INTO blog_posts (title, content, banner) VALUES ($1, $2, $3) RETURNING *'
  try {
    const result = await DB_POOL.query(query, [req.body.title, req.body.content, req.body.banner])
    req.log.info('Blog post inserted into DB!')
    res.status(200).send(result.rows[0])
  } catch (e) {
    req.log.error(e)
    res.status(500).send('Internal server error')
  }
})

export default router
