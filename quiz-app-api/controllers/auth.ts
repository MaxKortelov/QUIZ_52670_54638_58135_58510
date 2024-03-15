import express, {Request, Response, Router} from 'express';
import {findUser} from "../services/authService";

export const router: Router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  await findUser(req.body).then(user => {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.end(JSON.stringify(user, null, 2))
  }).catch(err => {
    res.statusCode = 500;
    res.end(JSON.stringify({message: err.message}))
  })
});