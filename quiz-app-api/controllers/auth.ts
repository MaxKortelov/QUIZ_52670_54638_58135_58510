import express, {Request, Response, Router} from 'express';
import {Email, LoginUser, mapDbUserToUser, NewUser} from "../types/user";
import {validateBody} from "../validators/entity.validator";
import {addUser, findUser} from "../db/auth";
import errorService from "../services/error.service";
import {validatePassword} from "../utils/crypto";
import {sendEmail} from "../services/email.service";
import {EmailOptions} from "../types/services/email.service";
import {login, registerUser, sendEmailResetPassword} from "../handlers/auth";

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

router.post('/user/login', login);

router.post('/user/email_action_password_reset', sendEmailResetPassword);
