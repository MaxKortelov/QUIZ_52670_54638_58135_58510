import React from 'react';
import { useAppSelector } from "utils/hooks/useAppSelector";
import { QuizListItem } from "./QuizListItem";
import { getQuizList } from "store/quiz/selectors";

import './QuizList.scss';

export const QuizList = () => {
    const quizList = useAppSelector(getQuizList)

    return (
        <div className="quizList">
            <div className="quizListTitle">Please choose quiz</div>
            <div className="quizListContent">
                {quizList?.quizSessions?.map(quiz =>
                    <QuizListItem key={quiz.uuid} value={quiz} />
                )}
            </div>
        </div>
    );
};
