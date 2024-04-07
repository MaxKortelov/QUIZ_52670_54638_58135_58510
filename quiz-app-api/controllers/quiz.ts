import express, {Router} from "express";
import {addQuizToDB} from "../handlers/quiz";

export const router: Router = express.Router();

// router.get('/', async (req: ICustomRequest, res: Response) => {
//   await findQuiz(req.query.type as QUIZ)
//     .then(quiz => {
//       res.setHeader('Content-Type', 'application/json')
//       res.setHeader('Access-Control-Allow-Credentials', 'true')
//       res.statusCode = 200
//       res.end(JSON.stringify(quiz, null, 2))
//     })
//     .catch(err => {
//       res.statusCode = 500;
//       res.end(JSON.stringify({message: err}))
//     })
//
// })
//
// router.post('/check', async (req: ICustomRequest, res: Response) => {
//   // No validation applied
//   checkAnswers(req.query.type as QUIZ, req.body).then((answers) => {
//     res.setHeader('Content-Type', 'application/json')
//     res.setHeader('Access-Control-Allow-Credentials', 'true')
//
//     res.statusCode = 200
//     res.end(JSON.stringify(answers, null, 2))
//   });
// })

router.get('/add', addQuizToDB)