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

/**
 * @swagger
 * tags:
 *   name: Quiz
 *   description: Quiz API
 */

/**
 * @swagger
 * /quiz/add:
 *   post:
 *     summary: Add new quiz
 *     tags: [Quiz]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewQuiz'
 *     responses:
 *       201:
 *         description: The quiz was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseSuccess'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 */
router.post('/add', addQuizToDB);

/**
 * @swagger
 * /quiz/list:
 *   get:
 *     summary: Returns the list of all quiz types
 *     tags: [Quiz]
 *     responses:
 *       200:
 *         description: The list successfully sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quizSessions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/QuizType'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 */
router.get('/list', quizSessions);

/**
 * @swagger
 * /quiz/generate:
 *   post:
 *     summary: Generate new quiz session
 *     tags: [Quiz]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GenerateQuizSession'
 *     responses:
 *       201:
 *         description: The quiz session was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quizSession:
 *                   $ref: '#/components/schemas/QuizSessionInfo'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 */
router.post('/generate', generateQuizSession);

router.post('/start', startQuizSession);

router.post('/question/save', validateQuizSession, saveQuizQuestion);

router.post('/question/next', validateQuizSession, nextQuizQuestion);

router.post('/submit', validateQuizSession, submitQuiz);