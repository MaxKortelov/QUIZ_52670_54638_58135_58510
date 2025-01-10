import express, {Router} from "express";
import {getQuestions} from "../handlers/chat";

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