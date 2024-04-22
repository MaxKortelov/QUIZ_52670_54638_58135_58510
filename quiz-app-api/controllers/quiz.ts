import express, {Router} from "express";
import {
  addQuizToDB,
  generateQuizSession,
  quizSessions,
  startQuizSession,
  saveQuizQuestion,
  submitQuiz, nextQuizQuestion
} from "../handlers/quiz";
import {validateQuizSession} from "../services/quiz-validation.service";

export const router: Router = express.Router();

router.post('/add', addQuizToDB);

router.get('/list', quizSessions);

router.post('/generate', generateQuizSession);

router.post('/start', startQuizSession);

router.post('/question/save', validateQuizSession, saveQuizQuestion);

router.post('/question/next', validateQuizSession, nextQuizQuestion);

router.post('/submit', validateQuizSession, submitQuiz);