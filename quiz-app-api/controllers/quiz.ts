import express, {Router} from "express";
import {
  addQuizToDB,
  generateQuizSession,
  quizSessions,
  startQuizSession,
  saveQuizQuestion,
  submitQuiz
} from "../handlers/quiz";

export const router: Router = express.Router();

router.get('/add', addQuizToDB);

router.get('/list', quizSessions);

router.get('/generate', generateQuizSession);

router.get('/start', startQuizSession);

router.get('/question/save', saveQuizQuestion);

router.get('/submit', submitQuiz);