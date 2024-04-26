const { log, logger } = require("./src/utils/log.js");
const express = require("express");
const app = express();
const port = 3000;

app.use(logger);

app.use(express.static("static"));

app.listen(port, () => {
  log.info(`Example app listening on port ${port}`);
});
