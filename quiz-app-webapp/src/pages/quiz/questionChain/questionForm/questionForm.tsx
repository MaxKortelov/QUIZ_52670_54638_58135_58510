import React, {useEffect, useState} from "react";
import {IQuestionForm} from "../../../../models/questionForm";
import {Button, Form} from "react-bootstrap";
import classNames from "classnames";

function QuestionForm({question, isLast, applyAnswer, answer}: IQuestionForm) {
  const [answerId, setAnswerId] = useState<string>(answer);
  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAnswerId(e.target.id)
  }

  const answers = () => question.options.map((it, i) => <Form.Check
    type='radio'
    id={it.id}
    label={it.text}
    name='question'
    key={i}
    required
    checked={answerId === it.id}
    onChange={handleChangeAnswer}
  />)

  useEffect(() => {
    setAnswerId(answer)
  }, [answer])

  const submitQuestion = (e: any): void => {
    e.preventDefault();
    e.stopPropagation();
    applyAnswer(question, answerId)
  }

  return (
    <Form className={classNames('flex-center flex-column fs-6')} onSubmit={submitQuestion}>
      <Form.Label className={classNames("mb-5 text-bold")}>{question.question}</Form.Label>
      <Form.Group>
        {answers()}
      </Form.Group>
      <Button className={classNames("position-absolute position-right-bottom")}
              type='submit'>{isLast ? "Finish" : "Next"}</Button>
    </Form>
  )
}

export default QuestionForm;