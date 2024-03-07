import Pool from 'pg-pool'
import 'dotenv/config'

export default new Pool({
	database: 'blogs',
	user: 'backend',
	password: 'backend',
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	max: 10,
	maxUses: 2000,
	idleTimeoutMillis: 1000,
	connectionTimeoutMillis: 1000,
})
