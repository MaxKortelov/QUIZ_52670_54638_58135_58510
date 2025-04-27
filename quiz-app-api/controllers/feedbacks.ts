import express, {Router} from "express";
import {addFeedback, getFeedbacks} from "../handlers/feedbacks";

export const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Feedbacks
 *   description: Feedbacks API
 */

/**
 * @swagger
 * /feedbacks:
 *   get:
 *     summary: Get list of feedbacks
 *     tags: [Feedbacks]
 *     responses:
 *       200:
 *         description: List of feedbacks
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedbacks'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 */
router.get('/', getFeedbacks);

/**
 * @swagger
 * /feedbacks:
 *   post:
 *     summary: Add feedback
 *     tags: [Feedbacks]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NewFeedback'
 *     responses:
 *       200:
 *         description: feedback added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 */
router.post('/', addFeedback);