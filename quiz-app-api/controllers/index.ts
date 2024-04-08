import {router as auth} from './auth'
import {router as quiz} from './quiz'
import {router as user} from './user'
import {Express} from "express";


export function setControllers(app: Express) {
  app.use('/auth', auth)
  app.use('/quiz', quiz)
  app.use('/quiz', user)
}