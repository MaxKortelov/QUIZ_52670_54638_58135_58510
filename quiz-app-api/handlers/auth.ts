import {Request, Response} from "express";
import {validateBody} from "../validators/entity.validator";
import {Email, LoginUser, mapDbUserToUser, NewUser, ResetPassword} from "../types/user";
import {addResetPasswordToken, addUser, findUser, resetPassword} from "../db/auth";
import errorService from "../services/error.service";
import {encryptPassword, validatePassword} from "../utils/crypto.util";
import {EmailOptions} from "../types/services/email.service";
import {sendEmail} from "../services/email.service";
import {resetPasswordTemplateHTML} from "../utils/templates.util";
import {ORIGIN} from "../@shared/env-vars";

export async function registerUser(req: Request, res: Response) {
  await validateBody(req, NewUser)
    .then((user) => addUser(user as NewUser))
    .then(user => {
      res.statusCode = 201;
      res.send(user);
      res.end();
    })
    .catch(() => errorService.existedEntityError(res));
}

export async function login(req: Request, res: Response) {
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
}

export async function sendEmailResetPassword(req: Request, res: Response) {
  await validateBody(req, Email)
    .then(async (u) => {
      const loginUser = u as Email;
      const user = await findUser(loginUser.email);
      return user;
    })
    .then(async (user) => {
      if(user) {
        const token = await addResetPasswordToken(user.email);
        const emailOptions: EmailOptions = {
          to: [user.email],
          subject: "Reset your password",
          html: resetPasswordTemplateHTML(`${ORIGIN}/reset_password?token=${token}`)
        }
        return emailOptions;
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
}

export async function updateUserPassword(req: Request, res: Response) {
  await validateBody(req, ResetPassword)
    .then((v) => {
      const entity = v as ResetPassword;
      const encryptedPassword = encryptPassword(entity.password);
      return resetPassword(encryptedPassword, entity.token);
    })
    .then(user => {
      res.statusCode = 200;
      res.send(user);
      res.end();
    })
    .catch(() => errorService.serverError(res, ["Token is not valid"]));
}