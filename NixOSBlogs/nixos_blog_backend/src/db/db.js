import { Pool } from "pg";
import { parse } from "pg-connection-string";

const config = process.env.PG_CONN
  ? parse(process.env.PG_CONN)
  : // Dev connection
    {
      host: "127.0.0.1",
      port: 5566,
      user: "backend",
      password: "backend",
      database: "nixos_blogs",
    };
const POOL = new Pool(config);

/**
 * Checks if a session is valid or not.
 * @param {Pool} pool - The DB Pool
 * @param {string} token - The session token
 * @returns {Promise<boolean>}
 */
async function sessionIsValid(pool, token) {
  const now = new Date();
  const twoDaysInMS = 2 * 24 * 60 * 60 * 1000;
  const twoDaysAgo = new Date(now.getTime() - twoDaysInMS);

  let response = await pool.query(
    "SELECT true FROM sesion WHERE token=$1 AND start BETWEEN $2 AND $3",
    [token, twoDaysAgo, now],
  );

  return response.rowCount < 1;
}

export default { POOL, sessionIsValid };
