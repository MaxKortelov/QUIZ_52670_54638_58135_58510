import {Request, Response} from "express";
import {getChatQuestions} from "../db/chat";
import errorService from "../services/error.service";
import {validateBody} from "../validators/entity.validator";
import {Prompt} from "../types/chat";
import {findBestMatch} from "../services/chat.service";
import LanguageDetect from "languagedetect"

const languageDetect = new LanguageDetect();

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
  await validateBody(req, Prompt).then(async (it) => {
    const { prompt } = it as Prompt;

    const isEnglish = languageDetect.detect(prompt, 15).filter(([lang, match]) => lang === 'english' && match > 0.05).length > 0;
    if(!isEnglish) {
      res.statusCode = 200;
      res.send({ answer: "Please write your question in English." });
      res.end();
      return;
    }

    const answer = await findBestMatch(prompt);

    if(!answer) {
      res.statusCode = 200;
      res.send({ answer: "Please try another question." });
      res.end();
      return;
    }

    res.statusCode = 200;
    res.send({ answer: answer.answer });
    res.end();
  }).catch(() => errorService.validationError(res, ["Validation failed"]));
}