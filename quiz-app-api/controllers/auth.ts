import express, {Request, Response, Router} from 'express';
import {LoginUser, mapDbUserToUser, NewUser} from "../models/user";
import {validateBody} from "../validators/entity.validator";
import {addUser, findUser} from "../db/auth";
import errorService from "../services/error.service";
import {validatePassword} from "../utils/crypto";

export const router: Router = express.Router();
router.post('/user/register', async (req: Request, res: Response) => {
   await validateBody(req, NewUser)
     .then((user) => addUser(user as NewUser))
     .then(user => {
        res.statusCode = 201;
        res.send(user);
        res.end();
     })
     .catch(() => errorService.existedEntityError(res));
});

router.post('/user/login', async (req: Request, res: Response) => {
   await validateBody(req, LoginUser)
     .then(async (u) => {
       const loginUser = u as LoginUser;
        const user = await findUser(loginUser.email);
        validatePassword(loginUser.password, user.password_hash, user.password_salt);
        return mapDbUserToUser(user);
     })
     .then(user => {
        console.log(user);
        res.statusCode = 200;
        res.send(user);
        res.end();
     })
     .catch(() => errorService.validationError(res, ["Incorrect email and/or password"]));
});
