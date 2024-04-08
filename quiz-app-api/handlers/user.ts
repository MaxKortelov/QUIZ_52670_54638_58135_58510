import {Request, Response} from "express";
import {validateBody} from "../validators/entity.validator";
import {Email, mapDbUserToUser} from "../types/user";
import {findUser} from "../db/auth";
import errorService from "../services/error.service";

export async function getUser(req: Request, res: Response) {
  await validateBody(req, Email)
    .then(async (it) => {
      const {email} = it as Email;
      const user = await findUser(email);
      return mapDbUserToUser(user);
    })
    .then(user => {
      res.statusCode = 200;
      res.send(user);
      res.end();
    })
    .catch(() => errorService.validationError(res, ["User not found"]));
}