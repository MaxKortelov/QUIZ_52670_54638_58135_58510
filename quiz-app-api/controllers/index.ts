import {router as auth} from './auth'
import {router as quiz} from './quiz'
import {router as user} from './user'
import {router as chat} from './chat'
import {router as feedbacks} from './feedbacks'
import {Express} from "express";


export function setControllers(app: Express) {
  app.use('/auth', auth)
  app.use('/quiz', quiz)
  app.use('/user', user)
  app.use('/chat', chat)
  app.use('/feedbacks', feedbacks)
}