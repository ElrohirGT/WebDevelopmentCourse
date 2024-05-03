import bodyParser from "body-parser";
import cors from "cors";
import express, { static as expressStatic } from "express";
import API_ROUTER from "./src/routes/index.js";
import { log, logger } from "./src/utils/log.js";
const app = express();

const host = "0.0.0.0";
// Custom port from env variable
// Usefull for railway deployment
const port = process.env.PORT || 3000;
const corsConfig = {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsConfig));
app.use(logger);
app.use(bodyParser.json({ limit: "15mb" }));

app.use(expressStatic("static"));
// Glue for the admin route...
app.use("/admin", expressStatic("static"));

app.use("/api", API_ROUTER);
app.listen(port, host, () => {
  log.info(`Example app listening on port ${host}:${port}`);
});
