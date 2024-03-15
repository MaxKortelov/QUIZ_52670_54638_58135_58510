import {router as auth} from './auth'
import {router as quiz} from './quiz'
import {Express} from "express";
import {verifyToken} from "../services/authService";


export function setControllers(app: Express) {
  app.use('/auth', auth)
  app.use('/quiz', verifyToken, quiz)
}