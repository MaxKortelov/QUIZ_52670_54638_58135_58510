import {Request, Response} from "express";
import {validateBody} from "../validators/entity.validator";
import {Email, LoginUser, mapDbUserToUser, NewUser, ResetPassword, VerifyEmail} from "../types/user";
import {
  addResetPasswordToken,
  addUser,
  addVerifyEmailToken,
  findUser,
  resetPassword,
  verificationEmail
} from "../db/auth";
import errorService from "../services/error.service";
import {encryptPassword, validatePassword} from "../utils/crypto.util";
import {EmailOptions} from "../types/services/email.service";
import {sendEmail} from "../services/email.service";
import {resetPasswordTemplateHTML, verifyEmailTemplateHTML} from "../utils/templates.util";
import {ORIGIN} from "../@shared/env-vars";
import {responseMessage} from "../utils/api.util";
import {createUserQuizTableResults, getFullUserQuizTableResults} from "../db/quiz";

export async function registerUser(req: Request, res: Response) {
  await validateBody(req, NewUser)
    .then((user) => addUser(user as NewUser))
    .then(async (user) => {
      await createUserQuizTableResults(user.uuid);
      const token = await addVerifyEmailToken(user.email);
      const emailOptions: EmailOptions = {
        to: [user.email],
        subject: "Verify your email",
        html: verifyEmailTemplateHTML(`${ORIGIN}/verify?token=${token}&email=${user.email}`)
      }
      return emailOptions;
    })
    .then(sendEmail)
    .then(() => {
      res.statusCode = 201;
      res.send(responseMessage("Message was successfully sent to email"));
      res.end();
    })
    .catch((err) => {
      errorService.validationError(res, err)
    });
}

export async function login(req: Request, res: Response) {
  await validateBody(req, LoginUser)
    .then(async (u) => {
      const loginUser = u as LoginUser;
      const user = await findUser(loginUser.email);
      validatePassword(loginUser.password, user.password_hash, user.password_salt);
      if(!user.user_confirmed) errorService.validationError(res, ["User email is not confirmed"])
      return mapDbUserToUser(user, await getFullUserQuizTableResults(user.uuid));
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
          html: resetPasswordTemplateHTML(`${ORIGIN}/reset-password?token=${token}&email=${user.email}`)
        }
        return emailOptions;
      } else {
        throw new Error(`User ${req.body.email} doesn't exist`)
      }
    })
    .then(sendEmail)
    .then(() => {
      res.statusCode = 200;
      res.send(responseMessage("Message was successfully sent"))
      res.end();
    }, () => errorService.serverError(res, ["Something went wrong. Message was not sent"]))
    .catch(() => {
      errorService.validationError(res, ["User with this email doesn't exist"]);
      res.end();
    });
}

export async function updateUserPassword(req: Request, res: Response) {
  await validateBody(req, ResetPassword)
    .then(async (v) => {
      const entity = v as ResetPassword;
      const user = await findUser(entity.email);

      if(user.reset_password_token !== entity.token) throw new Error("Token is not valid");

      const encryptedPassword = encryptPassword(entity.password);
      return resetPassword(encryptedPassword, entity.token);
    })
    .then((user) => {
      res.statusCode = 200;
      res.send(user);
      res.end();
    })
    .catch(() => errorService.validationError(res, ["Token is not valid"]));
}

export async function verifyEmail(req: Request, res: Response) {
  try {
    const { token, email } = await validateBody(req, VerifyEmail) as VerifyEmail;
    const user = await findUser(email);

    if(user.verify_email_token !== token) throw new Error("Token is not valid");
    await verificationEmail(email);

    res.statusCode = 200;
    res.send("Email is verified");
    res.end();
  } catch (_) {
    errorService.validationError(res, ["Token is not valid"])
  }
}
