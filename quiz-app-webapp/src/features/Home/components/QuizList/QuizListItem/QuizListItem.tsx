import React from 'react';
import { useNavigate } from "react-router-dom";
import { URL_QUIZ_INTRO } from "utils/constants/clientUrl";
import { QuizListInfoModel } from "utils/dto/quiz";

import './QuizListItem.scss';

type Props = {
    value: QuizListInfoModel;
}

export const QuizListItem = ({ value }: Props) => {
    const navigate = useNavigate()

    const goQuiz = () => navigate(URL_QUIZ_INTRO.path({ id: value.uuid}));

    return (
        <div className="quizListItem" onClick={goQuiz}>
            {value?.description}
        </div>
    );
};
