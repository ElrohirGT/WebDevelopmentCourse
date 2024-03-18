import express from 'express'
import DB_POOL from './db.js'
import { isNullOrUndefined, isTruthyAndNotEmpty, logger } from './lib.js'

const router = express.Router()

router.get('/posts/:postId', async (req, res) => {
  logger.info(`Trying to find post with ID: ${req.params.postId}...`)
  const query = `
  SELECT blog_id, title, banner, content, created_at
  FROM blog_posts b 
  WHERE blog_id=$1`

  try {
    const { rows: blogsFound } = await DB_POOL.query(query, [
      req.params.postId,
    ])
    if (blogsFound.length <= 0) {
      logger.error({
        msg: 'No post found with the given id!',
        postId: req.params.postId,
      })
      res.status(400).send('No post found!')
      return
    }

    const getLinksQuery = 'SELECT url FROM external_links WHERE blog_id = $1'
    const { rows: links } = await DB_POOL.query(getLinksQuery, [
      req.params.postId,
    ])

    logger.info('Post found!')
    res.status(200).send({ ...blogsFound[0], links: links.map((l) => l.url) })
  } catch (e) {
    logger.error(e)
    res.status(500).send('Internal server error')
  }
})

export const isValidUpdatePostBody = (body) => isTruthyAndNotEmpty(body.title)
  && !isNullOrUndefined(body.banner)
  && isTruthyAndNotEmpty(body.content)
  && Array.isArray(body.links)
router.put('/posts/:postId', async (req, res) => {
  logger.info('Parsing body...')
  if (!isValidUpdatePostBody(req.body)) {
    res.status(400).send('Invalid body request!')
    return
  }
  logger.info('Body parsed!')

  const { postId } = req.params
  logger.info(`Trying to update post with ID: ${postId}`)

  const conn = await DB_POOL.connect()
  logger.info('Starting transaction...')
  await conn.query('BEGIN')

  try {
    logger.info('Updating blog post...')
    const updateBlogQuery = `
UPDATE blog_posts SET
  title=$2, banner=$3, content=$4
WHERE blog_id=$1
RETURNING *`
    const { rowCount, rows: postsWithoutLinks } = await conn.query(
      updateBlogQuery,
      [postId, req.body.title, req.body.banner, req.body.content],
    )
    if (rowCount <= 0) {
      const msg = 'No post found with the given id!'
      logger.error({ postID: postId, msg })
      res.status(400).send(msg)
    }

    logger.info('Deleting previous links...')
    const deleteDBLinksQuery = 'DELETE FROM external_links WHERE blog_id=$1'
    await conn.query(deleteDBLinksQuery, [postId])

    let links = []

    if (req.body.links.length > 0) {
      const linksToSQL = req.body.links
        .map((url) => `(${url}, ${postId})`)
        .join(',')
      const insertLinksQuery = `INSERT INTO external_links VALUES ${linksToSQL} RETURNING url`
      logger.info({ msg: 'Inserting new links...', insertLinksQuery })
      links = (await conn.query(insertLinksQuery)).rows
    }

    res
      .status(200)
      .send({ ...postsWithoutLinks[0], links: links.map((l) => l.url) })
    await conn.query('COMMIT')
  } catch (e) {
    logger.error(e)
    logger.error('Rolling back, closing transaction...')
    await conn.query('ROLLBACK')
    res.status(500).send('Internal server error')
  } finally {
    conn.release()
  }
})

router.delete('/posts/:postId', async (req, res) => {
  const { postId } = req.params
  logger.info(`Attempting to delete post with ID: ${postId}`)

  const conn = await DB_POOL.connect().catch((e) => logger.error(e))

  if (conn === undefined) {
    res.status(500).send('DB Error')
  }

  try {
    logger.info('Starting transaction...')
    await conn.query('BEGIN')

    logger.info('Deleting external links...')
    const deleteLinksQuery = 'DELETE FROM external_links WHERE blog_id=$1'
    await conn.query(deleteLinksQuery, [postId])

    logger.info('Deleting blog post...')
    const deletePostQuery = 'DELETE FROM blog_posts WHERE blog_id = $1'
    await conn.query(deletePostQuery, [postId])

    logger.info('Comitting transaction...')
    await conn.query('COMMIT')

    res.status(200).send()
  } catch (e) {
    logger.error(e)
    logger.error('Rolling back, closing transaction...')
    await conn.query('ROLLBACK')
    res.status(500).send('Internal server error')
  } finally {
    logger.info('Releasing client...')
    conn.release()
  }
})

export default router
