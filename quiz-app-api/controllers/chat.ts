import express, {Router} from "express";
import {getAnswer, getQuestions} from "../handlers/chat";

export const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat API
 */

/**
 * @swagger
 * /chat/getQuestions:
 *   get:
 *     summary: Get list of questions
 *     tags: [Chat]
 *     responses:
 *       200:
 *         description: List of questions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatQuestions'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 */
router.get('/getQuestions', getQuestions);

/**
 * @swagger
 * /chat/send:
 *   post:
 *     summary: Get answer for chat prompt
 *     tags: [Chat]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Prompt'
 *     responses:
 *       200:
 *         description: answer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 */
router.post('/send', getAnswer);