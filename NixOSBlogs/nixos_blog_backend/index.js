import { log, logger } from "./src/utils/log.js";
import bodyParser from "body-parser";
import express, { json, static as expressStatic } from "express";
import API_ROUTER from "./src/routes/index.js";
const app = express();

const host = "0.0.0.0";
// Custom port from env variable
// Usefull for railway deployment
const port = process.env.PORT || 3000;

app.use(logger);
app.use(bodyParser.json({ limit: "15mb" }));
app.use(expressStatic("static"));
app.use("/api", API_ROUTER);

app.listen(port, host, () => {
  log.info(`Example app listening on port ${host}:${port}`);
});
