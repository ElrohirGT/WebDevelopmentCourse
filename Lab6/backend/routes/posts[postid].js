import express from 'express'
import DB_POOL from './db.js'
import URL_SEP from './lib.js'

const router = express.Router()

router.get('/posts/:postId', async (req, res) => {
  req.log.info(`Trying to find post with ID: ${req.params.postId}...`)
  const query = `
	SELECT blog_id, title, banner, content, created_at,
		(SELECT STRING_AGG(url, '${URL_SEP}') FROM external_links where blog_id = b.blog_id)
	FROM blog_posts b 
	WHERE blog_id=$1`

  try {
    const result = await DB_POOL.query(query, [req.params.postId])
    if (result.rows <= 0) {
      req.log.warn('No post found!')
    }

    req.log.info('Post found!')
    res.status(200).send(result.rows)
  } catch (e) {
    req.log.error(e)
    res.status(500).send('Internal server error')
  }
})

router.put('/posts/:postId', (req, res) => {
  res.status(200).send({ postId: '12376476' })
})

router.delete('/posts/:postId', (req, res) => {
  res.status(200).send({ postId: '12376476' })
})

export default router
