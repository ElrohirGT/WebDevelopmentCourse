const { log, logger } = require("./src/utils/log.js");
const express = require("express");
const app = express();
const host = "0.0.0.0";
const port = 3000;

app.use(logger);

app.use(express.static("static"));

app.listen(`${host}:${port}`, () => {
  log.info(`Example app listening on port ${port}`);
});
