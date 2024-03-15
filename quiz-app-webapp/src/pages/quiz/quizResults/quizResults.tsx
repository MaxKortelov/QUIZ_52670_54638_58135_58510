import React, {useMemo} from "react";
import classNames from "classnames";
import {useQuizSelectors} from "../../../store/selectors/quiz";
import {Button} from "react-bootstrap";
import {useActions} from "../../../hooks/useActions";
import {useNavigate} from "react-router-dom";

function QuizResults() {
  const {questions, answers} = useQuizSelectors();
  const {resetQuizState} = useActions();
  const navigate = useNavigate();

  const showAnswers = () => questions.map((it, i) => <li key={i} className={classNames("text-bold mb-2", {
    "text-red": !answers[it.id],
    "text-green": answers[it.id],
  })}>{it.question}</li>)

  const countedResult = useMemo(() => Object.values(answers).filter(it => Boolean(it)).length, [answers])

  const startAgain = () => {
    resetQuizState();
    navigate('/quiz');
  }

  return (
    <div className={classNames('d-flex w-100 h-100 flex-column align-items-center p-4')}>
      <ol className={classNames("w-80")}>{showAnswers()}</ol>
      <div className={classNames("fs-3")}>Result: {countedResult}/{Object.values(answers).length}</div>
      <Button onClick={startAgain}>Try again</Button>
    </div>
  )
}

export default QuizResults;