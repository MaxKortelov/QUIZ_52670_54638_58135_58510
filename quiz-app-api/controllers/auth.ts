import express, {Request, Response, Router} from 'express';
import {Email, LoginUser, mapDbUserToUser, NewUser} from "../models/user";
import {validateBody} from "../validators/entity.validator";
import {addUser, findUser} from "../db/auth";
import errorService from "../services/error.service";
import {validatePassword} from "../utils/crypto";
import {sendEmail} from "../services/email.service";
import {EmailOptions} from "../models/utils/services/email.service";

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
        res.statusCode = 200;
        res.send(user);
        res.end();
     })
     .catch(() => errorService.validationError(res, ["Incorrect email and/or password"]));
});

router.post('/user/email_action_password_reset', async (req: Request, res: Response) => {
   await validateBody(req, Email)
     .then(async (u) => {
       const loginUser = u as Email;
        const user = await findUser(loginUser.email);
        return user;
     })
     .then(user => {
        if(user) {
          const emailOptions: EmailOptions = {
            to: [user.email],
            subject: "Reset your password",
            html: "This is a test email"
          }
          return emailOptions;
          // sendEmail(emailOptions);

        } else {
          throw new Error(`User ${req.body.email} doesn't exist`)
        }
     })
     .then(sendEmail)
     .then(() => {
       res.statusCode = 200;
       res.send("Message was successfully sent")
       res.end();
     }, () => errorService.serverError(res, ["Something went wrong. Message was not sent"]))
     .catch(() => {
       errorService.validationError(res, ["User with this email doesn't exist"]);
       res.end();
     });
});
