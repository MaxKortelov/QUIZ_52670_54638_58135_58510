import React, { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppSelector";
import { URL_QUIZ } from "utils/constants/clientUrl";
import { Image, Spin } from "antd";
import { SubmitButton } from "components/SubmitButton";
import { getQuizAction } from "store/quiz/actions";
import { getQuiz, getQuizIsLoading, getQuizQuestionIsLoading } from "store/quiz/selectors";
import { getCurrentUser } from "store/user/selectors";
import Intro from "assets/img/intro.jpg";
import { dateFormats } from "utils/helpers/formatValues";

import './QuizIntro.scss';

export const QuizIntro = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const currentUser = useAppSelector(getCurrentUser)
    const quiz = useAppSelector(getQuiz)
    const isLoading = useAppSelector(getQuizIsLoading)
    const quizQuestionIsLoading = useAppSelector(getQuizQuestionIsLoading)

    useEffect(() => {
        quiz?.quizSession?.quizSessionId !== id &&
            dispatch(getQuizAction({ quizTypeId: String(id), email: currentUser?.email }));
    }, [id]);

    const goQuiz = () => navigate(URL_QUIZ.path({ id: String(id) }));

    return isLoading ? (
        <Spin />
    ) : (
        <div className="quizIntroPage">
            <div className="quizIntroPageTitle">Workplace safety</div>
            <div className="quizIntroPageDescription">Read the following instructions</div>
            <div className="quizIntroPageContent">
                <Image src={Intro} preview={false} />
                <div className="quizIntroPageOptions">
                    <div className="quizIntroPageOptionsItem">
                        <div className="quizIntroPageOptionsItemContent bold">Date:</div>
                        <div className="quizIntroPageOptionsItemContent">
                            {quiz?.quizSession.dateCreated?.format(dateFormats.dateOnly)}
                        </div>
                    </div>
                    <div className="quizIntroPageOptionsItem">
                        <div className="quizIntroPageOptionsItemContent bold">Time Limit:</div>
                        <div className="quizIntroPageOptionsItemContent">{quiz?.quizSession.quizDuration} Mins</div>
                    </div>
                    <div className="quizIntroPageOptionsItem">
                        <div className="quizIntroPageOptionsItemContent bold">Attempts:</div>
                        <div className="quizIntroPageOptionsItemContent">{quiz?.quizSession.quizAttempts}</div>
                    </div>
                    <div className="quizIntroPageOptionsItem">
                        <div className="quizIntroPageOptionsItemContent bold">Points:</div>
                        <div className="quizIntroPageOptionsItemContent">100 Points</div>
                    </div>
                </div>
            </div>
            <div className="quizIntroPageDescription bold">Instructions</div>
            <div className="quizIntroPageInstructions">
                <p>
                    This test consists of 3 multiple-choice questions. To be successful with the tests, it’s important to conversant with the topics. Keep the following in mind:
                </p>
                <p>
                    Timing - You need to complete each of your attempts in one sitting, as you are allotted 15 minutes to each attempt.
                </p>
                <p>
                    Answers - You may review your answer-choices and compare them to the correct answers after your final attempt.
                </p>
                <p>
                    To start, click the "Start" button. When finished, click the "Submit " button.
                </p>
            </div>
            <SubmitButton onClick={goQuiz} showSpinner spinnerTrigger={quizQuestionIsLoading}>
                Start
            </SubmitButton>
        </div>
    );
};
