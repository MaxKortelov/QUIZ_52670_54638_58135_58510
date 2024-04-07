// import {getQuiz} from "../api";
// import {IQuestion, QUIZ, quizTypes} from "../types/quiz";
//
// // TODO - delete module
// export async function findQuiz(type: QUIZ): Promise<IQuestion[] | Error> {
//   if(quizTypes[type]) {
//     return await getQuiz(quizTypes[type])
//       // .then(({data: questionsAnswers}) => mapToQuestionList(questionsAnswers))
//       .then(({data: questionsAnswers}) => questionsAnswers)
//       .catch(() => new Error("Internal Server error"));
//   } else {
//     return new Error('No quiz type found')
//   }
// }
//
// export async function checkAnswers(type: QUIZ, answers: Record<string, string>): Promise<Record<string, string> | Error> {
//   if(quizTypes[type]) {
//     return await getQuiz(quizTypes[type])
//       .then(({data: questionsAnswers}) => {
//         return questionsAnswers.reduce((acc, it) => {
//           const question = Object.entries(answers).find(([key]) => key === it.id);
//           if(question) {
//             return {...acc, [question[0]]: it.answerId === question[1] }
//           }
//           return acc;
//         }, {})
//       })
//       .catch(() => new Error("Internal Server error"));
//   } else {
//     return new Error('No quiz type found')
//   }
// }