import path from "path";
import dotenv from "dotenv";
import {startServer} from "./server";

  const envFile = process.env.NODE_ENV === "prod" ? ".env" : ".env.development"

  dotenv.config({path: path.resolve(__dirname, envFile)})

  startServer();
// }
