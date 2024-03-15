import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import styles from './shell.module.scss'
import {useAuthSelectors} from "../../store/selectors/auth";
import classNames from "classnames";
import {useQuizSelectors} from "../../store/selectors/quiz";
import {Alert} from "react-bootstrap";
import {useActions} from "../../hooks/useActions";
import {NO_VALUE} from "../../models/store/auth";

function Shell() {
  const {user} = useAuthSelectors();
  const {quizErrorMessage} = useQuizSelectors();
  const {setQuizError} = useActions();

  useEffect(() => {
    if (quizErrorMessage) {
      setTimeout(() => {
        setQuizError(NO_VALUE)
      }, 3000)
    }
  }, [quizErrorMessage, setQuizError])

  return (
    <div className={classNames('position-relative', styles.shell)}>
      <div className={classNames('d-flex w-100 py-4 p-2 bg-primary text-white justify-content-end')}>
        {user.profile.name}
      </div>
      <Outlet/>
      {quizErrorMessage && <Alert variant='danger'>{quizErrorMessage}</Alert>}
    </div>
  )
}

export default Shell;