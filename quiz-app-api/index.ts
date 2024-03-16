import express, {Express} from 'express';
import path from 'path';
import cors from 'cors';
import {port} from "./@shared/env-vars";
import bodyParser from "body-parser";
import {setControllers} from "./controllers";

const app: Express = express();

app.use(cors({origin: ["http://localhost:3000", "http://103.45.245.55:3000"]}))
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

setControllers(app);

app.listen(port, async function () {
  console.log('CORS-enabled web server listening on port 3001')
})