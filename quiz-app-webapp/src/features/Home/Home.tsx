import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppSelector";
import { Spin } from "antd";
import { ProfileInfo } from "./components/ProfileInfo";
import { QuizList } from "./components/QuizList";
import { getQuizListAction } from "store/quiz/actions";
import { getQuizListIsLoading } from "store/quiz/selectors";

import './Home.scss';

export const Home = () => {
    const dispatch = useAppDispatch()

    const isLoading = useAppSelector(getQuizListIsLoading)

    useEffect(() => {
        dispatch(getQuizListAction())
    }, []);

    return isLoading ? (
        <Spin />
    ) : (
        <div className="homePage" data-testid="HomePage">
            <ProfileInfo />
            <QuizList />
        </div>
    );
};
