import express from 'express'
import DB_POOL from './db.js'
import { isTruthyAndNotEmpty, logger } from './lib.js'

const router = express.Router()

router.get('/posts', async (_req, res) => {
  try {
    logger.info('Obtaining posts from DB...')
    const URL_SEP = '[&%&]'
    const query = `
SELECT blog_id, title, banner, content, created_at, (SELECT STRING_AGG(url, '${URL_SEP}') FROM external_links WHERE blog_id = b.blog_id) as external_links
FROM blog_posts b`

    const { rows } = await DB_POOL.query(query)
    logger.info('Obtained posts from DB!')

    res.status(200).send(
      rows.map(({
        blog_id: blogId,
        title,
        banner,
        content,
        created_at: createdAt,
        external_links: externalLinks,
      }) => ({
        blog_id: blogId,
        title,
        banner,
        content,
        created_at: createdAt,
        links: externalLinks?.split(URL_SEP) ?? [],
      })),
    )
  } catch (e) {
    logger.error(e)
    res.status(500).send('Internal server error')
  }
})

const reqIsValid = (body) => isTruthyAndNotEmpty(body.title) && isTruthyAndNotEmpty(body.content)

router.post('/posts', async (req, res) => {
  logger.info('Creating a new post...')

  logger.info('Checking if request is valid...')
  if (!reqIsValid(req.body)) {
    logger.error('Request is invalid!')
    res.status(400).send('Invalid request, remember to send a title and a content')
    return
  }
  logger.info('Request is valid!')

  logger.info('Inserting into DB...')
  const query = 'INSERT INTO blog_posts (title, content, banner) VALUES ($1, $2, $3) RETURNING *'
  try {
    const result = await DB_POOL.query(query, [req.body.title, req.body.content, req.body.banner])
    logger.info('Blog post inserted into DB!')
    res.status(200).send(result.rows[0])
  } catch (e) {
    logger.error(e)
    res.status(500).send('Internal server error')
  }
})

export default router
