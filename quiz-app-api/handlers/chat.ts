import {Request, Response} from "express";
import {getChatQuestions} from "../db/chat";
import errorService from "../services/error.service";
import {validateBody} from "../validators/entity.validator";
import {Prompt} from "../types/chat";

export async function getQuestions(_req: Request, res: Response) {
  try {
    const questions = await getChatQuestions();

    res.statusCode = 200;
    res.send({ questions });
    res.end();
  } catch (error) {
    errorService.serverError(res, ["Something went wrong"])
  }
}

export async function getAnswer(req: Request, res: Response) {
  await validateBody(req, Prompt).then((it) => {
    const { prompt } = it as Prompt;

    res.statusCode = 200;
    res.send({ answer: prompt });
    res.end();
  }).catch(() => errorService.validationError(res, ["Validation failed"]));
}