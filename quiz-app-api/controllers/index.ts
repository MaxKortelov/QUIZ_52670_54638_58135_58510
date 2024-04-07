import {router as auth} from './auth'
import {router as quiz} from './quiz'
import {Express} from "express";


export function setControllers(app: Express) {
  app.use('/auth', auth)
  // app.use('/quiz', verifyToken, quiz)
  app.use('/quiz', quiz)
}