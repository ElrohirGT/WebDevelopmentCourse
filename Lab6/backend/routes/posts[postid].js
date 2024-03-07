import express from 'express'
import DB_POOL from './db.js'

const router = express.Router()

router.get('/posts/:postId', async (req, res) => {
	req.log.info(`Trying to find post with ID: ${req.params.postId}...`)
	const query = `
	SELECT blog_id, title, banner, content, created_at
	FROM blog_posts b 
	WHERE blog_id=$1`

	try {
		const { rows: blogsFound } = await DB_POOL.query(query, [req.params.postId])
		if (blogsFound.length <= 0) {
			req.log.err({ msg: 'No post found with the given id!', postId: req.params.postId })
			res.status(400).send('No post found!')
			return
		}

		const getLinksQuery = 'SELECT url FROM external_links WHERE blog_id = $1'
		const { rows: links } = await DB_POOL.query(getLinksQuery, [req.params.postId])

		req.log.info('Post found!')
		res.status(200).send({ ...blogsFound[0], links })
	} catch (e) {
		req.log.error(e)
		res.status(500).send('Internal server error')
	}
})

const isValidUpdatePostBody = (body) => (body.title != '') && (typeof body.banner !== 'undefined') && (body.content != '') && Array.isArray(body.links)
router.put('/posts/:postId', async (req, res) => {
	req.log.info('Parsing body...')
	if (!isValidUpdatePostBody(req.body)) {
		res.status(400).send('Invalid body request!')
		return
	}
	req.log.info('Body parsed!')

	const { postId } = req.params
	req.log.info(`Trying to update post with ID: ${postId}`)

	req.log.info('Starting transaction...')
	const conn = await DB_POOL.connect()
	conn.query('BEGIN')

	try {
		req.log.info('Updating blog post...')
		const updateBlogQuery = `
			UPDATE blog_posts SET
				title=$2, banner=$3, content=$4
			WHERE blog_id=$1
			RETURNING *`
		const { rowCount, rows: postsWithoutLinks } = await conn.query(updateBlogQuery, [
			postId,
			req.body.title,
			req.body.banner,
			req.body.content,
		])
		if (rowCount <= 0) {
			const msg = 'No post found with the given id!'
			req.log.error({ postID: postId, msg })
			res.status(400).send(msg)
		}

		req.log.info('Deleting previous links...')
		const deleteDBLinksQuery = 'DELETE FROM external_links WHERE blog_id=$1'
		await conn.query(deleteDBLinksQuery, [postId])

		let links = []

		if (req.body.links.length > 0) {
			const linksToSQL = req.body.links.map((url) => `(${url}, ${postId})`).join(',')
			const insertLinksQuery = `INSERT INTO external_links VALUES ${linksToSQL} RETURNING *`
			req.log.info({ msg: 'Inserting new links...', insertLinksQuery })
			links = (await conn.query(insertLinksQuery)).rows
		}

		res.status(200).send({ ...(postsWithoutLinks[0]), links })
		conn.query('COMMIT')
	} catch (e) {
		req.log.error(e)
		req.log.error('Rolling back, closing transaction...')
		conn.query('ROLLBACK')
		res.status(500).send('Internal server error')
	} finally {
		conn.release()
	}
})

router.delete('/posts/:postId', async (req, res) => {
	const { postId } = req.params
	req.log.info(`Attempting to delete post with ID: ${postId}`)

	req.log.info('Starting transaction...')
	const conn = await DB_POOL.connect()
	conn.query('BEGIN')

	try {
		const deleteLinksQuery = 'DELETE FROM external_links WHERE blog_id=$1'
		await conn.query(deleteLinksQuery, postId)

		const deletePostQuery = 'DELETE FROM blog_posts WHERE blog_id = $1'
		await conn.query(deletePostQuery, postId)

		conn.query('COMMIT')
	} catch (e) {
		req.log.error(e)
		req.log.error('Rolling back, closing transaction...')
		conn.query('ROLLBACK')
		res.status(500).send('Internal server error')
	} finally {
		conn.release()
	}
})

export default router
