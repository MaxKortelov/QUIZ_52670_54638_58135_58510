import React, {useState} from "react";
import classNames from "classnames";
import {useQuizSelectors} from "../../../store/selectors/quiz";
import {Pagination} from "react-bootstrap";
import {initialAnswers} from "../../../models/questionChain";
import {compareQuestionsId, findLastestQuestionId, findLastQuestion} from "../../../utils/quiz";
import QuestionForm from "./questionForm/questionForm";
import {IQuestion, quizTypes} from "../../../models/store/quiz";
import {useActions} from "../../../hooks/useActions";
import {useNavigate} from "react-router-dom";

function QuestionChain() {
  const {questions} = useQuizSelectors();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers(questions));
  const {checkQuiz} = useActions();
  const navigate = useNavigate();

  const handleChooseQuestion = (i: number) => setCurrentQuestion(i)

  const questionChain = (): JSX.Element[] => questions.map((it, i) =>
    <Pagination.Item key={i} disabled={i > findLastQuestion(answers)} onClick={() => handleChooseQuestion(i)}
                     active={i === currentQuestion}>
      {i + 1}
    </Pagination.Item>)

  const checkAnswers = (answers: Record<string, string>): void => {
    checkQuiz(answers, quizTypes.GENERAL_KNOWLEDGE_FACTFULNESS);
    navigate('/quiz/results');
  }
  const updateAnswers = (): void => {
    setCurrentQuestion(s => ++s)
  }

  const applyAnswer = (question: IQuestion, answerId: string): void => {
    const newAnswers = Object.fromEntries(Object.entries(answers).map(([questionId, _]) => questionId === question.id ? [questionId, answerId] : [questionId, _]))
    setAnswers(newAnswers)
    compareQuestionsId(question.id, findLastestQuestionId(questions)) ? checkAnswers(newAnswers) : updateAnswers()
  }

  return (
    <div className={classNames('d-flex w-100 h-100 flex-column align-items-center p-4')}>
      <Pagination size="sm">{questionChain()}</Pagination>
      <div className={classNames('w-100 h-100 flex-center position-relative')}>
        <QuestionForm question={questions[currentQuestion]}
                      isLast={compareQuestionsId(findLastestQuestionId(questions), questions[currentQuestion].id)}
                      applyAnswer={applyAnswer} answer={answers[questions[currentQuestion].id]}/>
      </div>
    </div>
  )
}

export default QuestionChain;