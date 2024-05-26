import {port} from "./@shared/env-vars";
import db from "./db";
import {loadInitialQuizzes} from "./services/quiz.service";
import {setControllers} from "./controllers";
import swaggerDocs from "./utils/swagger.util";
import app from "./app";
import {Server} from "http";

export async function startServer(): Promise<void> {
  app.listen(port, async function () {
    console.log("CORS-enabled web server listening on port 3001");

    await db
      .connect()
      .then(() =>
        console.info("Connected to quiz database on port 5432 successfully"),
      )
      .catch(() => console.error("Failed to connect to quiz database"));

    await loadInitialQuizzes();

    swaggerDocs(app, port);
  });
}
