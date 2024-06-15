import React, { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { URL_NOT_FOUND } from "utils/constants/clientUrl";
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppSelector";
import { Spin, Statistic } from "antd";
import { QuizQuestion } from "./components/QuizQuestion";
import { getQuizAction, getQuizResultAction, startQuizAction } from "store/quiz/actions";
import { getCurrentUser } from "store/user/selectors";
import { getQuiz, getQuizIsLoading, getQuizQuestion } from "store/quiz/selectors";

import './Quiz.scss';

export const Quiz = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const currentUser = useAppSelector(getCurrentUser)
    const quiz = useAppSelector(getQuiz)
    const quizIsLoading = useAppSelector(getQuizIsLoading)
    const quizQuestion = useAppSelector(getQuizQuestion)

    useEffect(() => {
        !quiz?.quizSession?.quizSessionId &&
            dispatch(getQuizAction({
                quizTypeId: String(id),
                email: currentUser?.email
            })).catch(() => navigate(URL_NOT_FOUND.path()));
    }, [id]);

    useEffect(() => {
        quiz?.quizSession?.quizSessionId && dispatch(startQuizAction({
            quizSessionId: quiz?.quizSession?.quizSessionId,
            email: currentUser?.email
        }))
    }, [quiz]);

    const onTimeOut = async () => {
        await dispatch(getQuizResultAction({
            quizSessionId: quiz?.quizSession?.quizSessionId,
            email: currentUser?.email,
        }))
    }

    return quizIsLoading ? (
        <Spin />
    ) : (
        <div className="quizPage" data-testid="QuizPage">
            <div className="quizPageHeader">
                <div>
                    <div className="quizPageTitle">Workplace safety</div>
                    <div className="quizPageDescription">Answer the question below</div>
                </div>
                <div className="quizPageTimer">
                    Timer:
                    <Statistic.Countdown
                        className="quizPageTimer"
                        value={quizQuestion?.dateEnded?.getTime()}
                        format="mm:ss"
                        onFinish={onTimeOut}
                    />
                </div>
            </div>

            <QuizQuestion />
        </div>
    );
};
