import express, {Router} from "express";
import {addQuizToDB, quizSessions, startQuizSession} from "../handlers/quiz";

export const router: Router = express.Router();

router.get('/add', addQuizToDB);

router.get('/list', quizSessions);

router.get('/start', startQuizSession);