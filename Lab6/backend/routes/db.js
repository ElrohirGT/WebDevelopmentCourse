import Pool from 'pg-pool'

export default new Pool({
  database: 'blogs',
  user: 'backend',
  password: 'backend',
  port: '5433',
  max: 10,
  maxUses: 2000,
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 1000,
})
