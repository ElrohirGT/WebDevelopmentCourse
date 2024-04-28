const { Pool } = require("pg");
const { parse } = require("pg-connection-string");

const config = process.env.PG_CONN
  ? parse(process.env.PG_CONN)
  : // Dev connection
    {
      host: "127.0.0.1",
      port: 5566,
      user: "backend",
      password: "backend",
    };

module.exports = new Pool(config);
