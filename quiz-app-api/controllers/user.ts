import express, {Router} from "express";
import {getUser} from "../handlers/user";

export const router: Router = express.Router();
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User API
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Get user info
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Email'
 *     responses:
 *       201:
 *         description: The user was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 */
router.post('/', getUser);