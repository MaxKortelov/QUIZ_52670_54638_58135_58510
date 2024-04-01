import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import path from "path";
import {ORIGIN, port} from "./@shared/env-vars";
import { setControllers } from "./controllers";
import db from "./db";
import "dotenv/config";
import swaggerDocs from "./utils/swagger";

const app: Express = express();

app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  }),
);
app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, async function () {
  console.log("CORS-enabled web server listening on port 3001");

  await db
    .connect()
    .then(() =>
      console.info("Connected to quiz database on port 5432 successfully"),
    )
    .catch(() => console.error("Failed to connect to quiz database"));

  setControllers(app);
  swaggerDocs(app, port);
});
