import express, {Router} from "express";
import {
  addQuizToDB,
  generateQuizSession,
  nextQuizQuestion,
  quizSessions,
  saveQuizQuestion,
  startQuizSession,
  submitQuiz
} from "../handlers/quiz";
import {validateQuizSession} from "../validators/quiz.validator";

export const router: Router = express.Router();

router.post('/add', addQuizToDB);

router.get('/list', quizSessions);

router.post('/generate', generateQuizSession);

router.post('/start', startQuizSession);

router.post('/question/save', validateQuizSession, saveQuizQuestion);

router.post('/question/next', validateQuizSession, nextQuizQuestion);

router.post('/submit', validateQuizSession, submitQuiz);