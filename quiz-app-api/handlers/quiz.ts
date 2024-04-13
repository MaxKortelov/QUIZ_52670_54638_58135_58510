import {Request, Response} from "express";
import {validateBody} from "../validators/entity.validator";
import {GenerateQuizSession, NewQuiz, StartQuizSession} from "../types/quiz";
import errorService from "../services/error.service";
import * as quizDB from "../db/quiz";
import {getQuizTypeList} from "../db/quiz";
import {addQuestions, createQuizSession, initiateQuizSession} from "../services/quiz.service";
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
        res.statusCode = 201;
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

export async function generateQuizSession(req: Request, res: Response) {
    try {
      const quizSessionRequestData = await validateBody(req, GenerateQuizSession) as GenerateQuizSession;
      const user = await findUser(quizSessionRequestData.email);
      const quizSession = await createQuizSession(quizSessionRequestData.quizTypeId, user.uuid);
      res.statusCode = 200;
      res.send(quizSession)
    } catch (_) {
      errorService.serverError(res, ["Something went wrong"])
    }
}

export async function startQuizSession(req: Request, res: Response) {
  try {
    const quizSessionRequestData = await validateBody(req, StartQuizSession) as StartQuizSession;
    const user = await findUser(quizSessionRequestData.email);
    const quizData = await initiateQuizSession(quizSessionRequestData.quizSessionId, user.uuid)
    res.statusCode = 200;
    res.send(quizData);
  } catch (_) {
    errorService.serverError(res, ["Something went wrong"])
  }
}