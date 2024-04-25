import {NextFunction, Request, Response} from "express";
import errorService from "../services/error.service";
import {findUser} from "../db/auth";

export async function validateEmailVerification(req: Request, res: Response, next: NextFunction) {
  try {
    const {email} = req.body;
    const {user_confirmed} = await findUser(email);

    if (!user_confirmed) {
      return errorService.lockedResource(res, ["Email should be verified"]);
    }

    next();
  } catch (e) {
    errorService.validationError(res, ["Something went wrong. Please try again"]);
  }
}