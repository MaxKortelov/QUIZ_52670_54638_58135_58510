import express, {Router} from 'express';
import {login, registerUser, sendEmailResetPassword, updateUserPassword, verifyEmail} from "../handlers/auth";
import {validateEmailVerification} from "../validators/auth.validator";

export const router: Router = express.Router();
/**
 * @openapi
 * /auth/user/register:
 *   post:
 *     description: Register new user
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              - $ref: '#/models/user/NewUser'
 *     produces:
 *        - application/json
 *     responses:
 *       201:
 *         description: Returns created user.
 *       500:
 *         description: Internal server error.
*/
router.post('/user/register', registerUser);

router.post('/user/login', validateEmailVerification, login);

router.post('/user/email_action_password_reset', sendEmailResetPassword);

router.post('/user/password_update', updateUserPassword);

router.post('/user/email/verify', verifyEmail);
