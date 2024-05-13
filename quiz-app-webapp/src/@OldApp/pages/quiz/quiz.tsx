import React from "react";
import {useActions} from "../../hooks/useActions";
import {quizTypes} from "../../models/store/quiz";
import {Button} from "react-bootstrap";
import classNames from "classnames";
import {useQuizSelectors} from "../../store/selectors/quiz";
import QuestionChain from "./questionChain/questionChain";

function Quiz() {
  const {getQuestions} = useActions();
  const {questions} = useQuizSelectors();

  const handleClick = (): void => {
    getQuestions(quizTypes.GENERAL_KNOWLEDGE_FACTFULNESS);
  }

  return (
    <div className={classNames('h-100 w-100 flex-center')}>
      {questions.length > 0
        ? <QuestionChain/>
        : <Button onClick={handleClick} className={classNames("p-4 fs-6")}>START</Button>}
    </div>
  )
}

export default Quiz;