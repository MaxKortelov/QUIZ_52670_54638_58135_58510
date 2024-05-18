import express, {Express} from "express";
import cors from "cors";
import {ORIGIN} from "./@shared/env-vars";
import path from "path";
import bodyParser from "body-parser";

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

export default app;