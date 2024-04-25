import express, {Router} from 'express';
import {login, registerUser, sendEmailResetPassword, updateUserPassword, verifyEmail} from "../handlers/auth";
import {validateEmailVerification} from "../validators/auth.validator";

export const router: Router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth API
 */

/**
 * @swagger
 * /auth/user/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: The user was successfully registered
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
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 */
router.post('/user/register', registerUser);

/**
 * @swagger
 * /auth/user/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
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
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 */
router.post('/user/login', validateEmailVerification, login);

router.post('/user/email_action_password_reset', sendEmailResetPassword);

router.post('/user/password_update', updateUserPassword);

router.post('/user/email/verify', verifyEmail);
