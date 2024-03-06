import express from 'express'
import DB_POOL from './db.js'

const router = express.Router()

const URL_SEP = '[$$]'

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

router.post('/posts', async (req, res) => {
  res.status(200).send({ postId: '1236454' })
})

export default router
