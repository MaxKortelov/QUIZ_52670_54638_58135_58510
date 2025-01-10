import {Request, Response} from "express";
import {getChatQuestions} from "../db/chat";
import errorService from "../services/error.service";

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