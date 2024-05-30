import {userQuizMock} from "./user.mock";
import {
  Answer,
  AnswerDB,
  NewAnswer,
  NewQuiz,
  QuestionDB,
  QuestionWithAnswersDB,
  QuizQuestion,
  QuizSessionDB, SaveQuizQuestion
} from "../../types/quiz";
import {uniqueId} from "../../utils/crypto.util";
import {ArrayMinSize, IsArray, IsEmail, IsString, MinLength, ValidateNested} from "class-validator";
import {IsValidArrayOfObjects} from "../../utils/decorators.util";

export const newQuizTest: NewQuiz = {
  "quizType": "Company Policy Test",
  "questions": [
  {
    "answers": [
      {
        "id": "1",
        "text": "Ask a friend who works in a different department"
      },
      {
        "id": "2",
        "text": "Read the employee handbook or company intranet"
      },
      {
        "id": "3",
        "text": "There are probably no written policies, it's all up to your manager"
      }
    ],
    "answerId": "2",
    "question": "Where should you look for information on your company's policies?"
  },
  {
    "answers": [
      {
        "id": "1",
        "text": "It's not that important, most policies are common sense"
      },
      {
        "id": "2",
        "text": "Only managers need to know the policies"
      },
      {
        "id": "3",
        "text": "It helps you understand your rights and responsibilities as an employee"
      }
    ],
    "answerId": "3",
    "question": "Why is it important to be familiar with company policies?"
  },
    {
      "answers": [
        {
          "id": "1",
          "text": "Politely remind them of the policy"
        },
        {
          "id": "2",
          "text": "Report the violation to your supervisor or HR representative"
        },
        {
          "id": "3",
          "text": "Ignore it, it's not your place to get involved"
        }
      ],
      "answerId": "2",
      "question": "You witness a coworker violating a company policy. What should you do?"
    },
    {
      "answers": [
        {
          "id": "1",
          "text": "Dress code and personal appearance"
        },
        {
          "id": "2",
          "text": "Internet and social media usage on company equipment"
        },
        {
          "id": "3",
          "text": "Vacation and sick leave procedures"
        }
      ],
      "answerId": "3",
      "question": "Company policies can cover a wide range of topics. Which of these is most likely NOT included in a company policy?"
    }
  ]
}

export const generateQuizSessionPayload = {
  email: userQuizMock.email,
  quizTypeId: ""
}

export const quizSessionData = {
  email: userQuizMock.email,
  quizSessionId: ""
}

export const quizQuestion = (answersAmount = 1): QuizQuestion => ({
  questionId: "1",
  question: "Test question",
  answers: Array(answersAmount).map(newAnswer),
  quizType: "Test type"
});

export const newAnswer = (): NewAnswer => ({
  id: uniqueId(),
  text: "Test answer"
});

export const answer = (): Answer => ({
  uuid: uniqueId(),
  answer_text: "Test answer",
  question_id: `${uniqueId()}`
});

export const mockQuizSessionDB: QuizSessionDB = {
  uuid: uniqueId(),
  question_sequence: ["testquestionId", "testquestionId1"],
  question_answer: {"testquestionId": "testAnswerId"},
  question_type_id: uniqueId(),
  user_id: uniqueId(),
  duration: 20,
  date_created: new Date().toString(),
  date_started: new Date().toString(),
  date_ended: new Date().toString(),
  attempts: 10,
  attempts_used: 0,
  result: null
}

export const mockEmptyQuizSessionDB: QuizSessionDB = {
  uuid: uniqueId(),
  question_sequence: [],
  question_answer: {},
  question_type_id: uniqueId(),
  user_id: uniqueId(),
  duration: 20,
  date_created: new Date().toString(),
  date_started: new Date().toString(),
  date_ended: new Date().toString(),
  attempts: 10,
  attempts_used: 0,
  result: null
}

export const mockQuestionDB: QuestionDB =  {
  uuid: uniqueId(),
  question_text: "test question",
  correct_answers: [],
  question_type_id: "test type id"
}

export const mockQuizQuestion = (answersAmount = 1): QuizQuestion => ({
  questionId: uniqueId(),
  question: "Test question",
  answers: Array(answersAmount).map(newAnswer),
  quizType: "testQuizType"
})

export const mockAnswerDB: AnswerDB = {
  uuid: uniqueId(),
  answer_text: "answer text",
  question_id: uniqueId()
}

export const questionWithAnswerDB: QuestionWithAnswersDB = {
  ...mockQuestionDB,
  answers: [mockAnswerDB]
}

export const mockSaveQuizQuestion: SaveQuizQuestion = {
  email: "test@test.com",
  quizSessionId: uniqueId(),
  questionId: uniqueId(),
  answerId: uniqueId()
}