import express, {Express} from 'express';
import path from 'path';
import cors from 'cors';
import {port} from "./@shared/env-vars";
import bodyParser from "body-parser";
import {setControllers} from "./controllers";

const app: Express = express();

const whiteList = ["http://localhost:3000", "http://103.45.245.55:3000", "http://172.25.0.3:3000"]

app.use(cors({
  origin: function (origin, callback) {
    console.log(whiteList);
    console.log(origin);
    console.log(whiteList.indexOf(origin as string));
    if (whiteList.indexOf(origin as string) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }}
}))
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

setControllers(app);

app.listen(port, async function () {
  console.log('CORS-enabled web server listening on port 3001')
})