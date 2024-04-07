import {Request, Response} from "express";
import {validateBody} from "../validators/entity.validator";
import {NewQuiz} from "../types/quiz";
import errorService from "../services/error.service";

export async function addQuizToDB(req: Request, res: Response) {
  await validateBody(req, NewQuiz).then(() => {
    res.send("ok")
  }).catch((errors: Array<string>) => errorService.validationError(res, errors))
}