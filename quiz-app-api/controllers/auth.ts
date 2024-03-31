import express, {Request, Response, Router} from 'express';
import {NewUser} from "../models/user";
import {validateBody} from "../validators/entity.validator";
import {addUser} from "../db/auth";
import errorService from "../services/error.service";

export const router: Router = express.Router();
router.post('/user/register', async (req: Request, res: Response) => {
   await validateBody(req, res, NewUser)
     .then(addUser)
     .then(user => {
        res.statusCode = 201;
        res.send(user);
        res.end();
     })
     .catch(() => errorService.existedEntityError(res));
});
