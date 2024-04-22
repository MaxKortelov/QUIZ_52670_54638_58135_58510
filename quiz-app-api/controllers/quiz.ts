import express, {Router} from "express";
import {
  addQuizToDB,
  generateQuizSession,
  quizSessions,
  startQuizSession,
  saveQuizQuestion,
  submitQuiz, nextQuizQuestion
} from "../handlers/quiz";

export const router: Router = express.Router();

router.post('/add', addQuizToDB);

router.get('/list', quizSessions);

router.post('/generate', generateQuizSession);

router.post('/start', startQuizSession);

router.post('/question/save', saveQuizQuestion);

router.post('/question/next', nextQuizQuestion);

router.post('/submit', submitQuiz);