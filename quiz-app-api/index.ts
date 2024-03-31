import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import path from "path";
import { port } from "./@shared/env-vars";
import { setControllers } from "./controllers";
import db from "./db";
import "dotenv/config";

const app: Express = express();
const origin =
  process.env.NODE_ENV === "dev"
    ? "http://localhost:3000"
    : "http://103.45.245.55:3000";

app.use(
  cors({
    origin,
    credentials: true,
  }),
);
app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

setControllers(app);

app.listen(port, async function () {
  console.log("CORS-enabled web server listening on port 3001");

  await db
    .connect()
    .then(() =>
      console.info("Connected to quiz database on port 5432 successfully"),
    )
    .catch(() => console.error("Failed to connect to quiz database"));
});
