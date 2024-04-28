const { log, logger } = require("./src/utils/log.js");
const express = require("express");
const app = express();
const API_ROUTER = require("./src/routes/index.js");

const host = "0.0.0.0";
// Custom port from env variable
// Usefull for railway deployment
const port = process.env.PORT || 3000;

app.use(logger);
app.use(express.static("static"));
app.use("/api", API_ROUTER);

app.listen(port, host, () => {
  log.info(`Example app listening on port ${host}:${port}`);
});
