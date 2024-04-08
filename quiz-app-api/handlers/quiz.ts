import {Request, Response} from "express";
import {validateBody} from "../validators/entity.validator";
import {NewQuiz, StartQuizSession} from "../types/quiz";
import errorService from "../services/error.service";
import * as quizDB from "../db/quiz";
import {addQuestions, createQuizSession} from "../services/quiz.service";
import {getQuizTypeList} from "../db/quiz";
import {findUser} from "../db/auth";

export async function addQuizToDB(req: Request, res: Response) {
  await validateBody(req, NewQuiz).then((result) => result as NewQuiz)
    .then(async (quiz) => {
      try {
        const quizTypeId = await quizDB.addQuestionType(quiz.quizType).catch((errors: Array<string>) => errorService.validationError(res, errors));
        if (quizTypeId) {
          await addQuestions(quizTypeId, quiz.questions)
        } else {
          errorService.serverError(res, ["Server error - questionType"])
        }

        res.send({message: "Quiz was successfully added."})
      } catch (_) {
        errorService.serverError(res, ["Something went wrong"])
      }
    })
}

export async function quizSessions(_req: Request, res: Response) {
    try {
      const quizSessions = await getQuizTypeList();
      res.statusCode = 200
      res.send({quizSessions});
    } catch (_) {
      errorService.serverError(res, ["Something went wrong"])
    }
}

export async function startQuizSession(req: Request, res: Response) {
    try {
      const quizSessionReqestData = await validateBody(req, StartQuizSession) as StartQuizSession;
      const user = await findUser(quizSessionReqestData.email);
      const quizSession = await createQuizSession(quizSessionReqestData.quizTypeId, user.uuid);
      res.send({})
    } catch (_) {
      errorService.serverError(res, ["Something went wrong"])
    }
}