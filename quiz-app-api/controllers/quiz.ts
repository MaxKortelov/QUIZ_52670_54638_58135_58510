import express, {Router} from "express";
import {addQuizToDB, generateQuizSession, quizSessions, startQuizSession} from "../handlers/quiz";

export const router: Router = express.Router();

router.get('/add', addQuizToDB);

router.get('/list', quizSessions);

router.get('/generate', generateQuizSession);

router.get('/start', startQuizSession);