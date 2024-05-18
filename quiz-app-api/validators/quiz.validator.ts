import {NextFunction, Request, Response} from "express";
import {getQuizSessionById} from "../db/quiz";
import errorService from "../services/error.service";
import {submitQuiz} from "../handlers/quiz";

export async function validateQuizSession(req: Request, res: Response, next: NextFunction) {
  try {
    const {quizSessionId} = req.body;
    const {date_ended} = await getQuizSessionById(quizSessionId);
    const isQuizSessionEnded = new Date().getTime() > new Date(date_ended).getTime();

    if(isQuizSessionEnded) {
      return errorService.lockedResource(res, ["Quiz session is finished"]);
    }

    next();
  } catch (e) {
    errorService.validationError(res, ["Cannot validate quiz session"]);
  }
}
