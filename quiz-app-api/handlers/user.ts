import {Request, Response} from "express";
import {validateBody} from "../validators/entity.validator";
import {Email, mapDbUserToUser} from "../types/user";
import {findUser} from "../db/auth";
import errorService from "../services/error.service";

// todo - remove vulnerability that allows to load other users data by email
export async function getUser(req: Request, res: Response) {
  await validateBody(req, Email)
    .then(async (it) => {
      const {email} = it as Email;
      const user = await findUser(email);

      const mockedData = {
        quiz_amount_taken: 2,
        fastest_quiz_time: "19 min 42 sec",
        correct_answers: 15
      }

      return mapDbUserToUser(user, mockedData);
    })
    .then(user => {
      res.statusCode = 200;
      res.send(user);
      res.end();
    })
    .catch(() => errorService.validationError(res, ["User not found"]));
}