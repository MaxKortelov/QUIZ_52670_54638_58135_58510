import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from "utils/hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import { URL_HOME } from "utils/constants/clientUrl";
import { Button, Form, Modal, Radio, RadioChangeEvent } from 'antd';
import { SubmitButton } from "components/SubmitButton";
import { quizService } from "services/quiz.service";
import { getQuizQuestionAction, getQuizResultAction } from "store/quiz/actions";
import { getCurrentUser } from "store/user/selectors";
import { getQuiz, getQuizQuestion, getQuizResult } from "store/quiz/selectors";

import './QuizQuestion.scss';
import {getCurrentUserAction} from "store/user/actions";
import {QUIZ_EMAIL} from "utils/constants";

export const QuizQuestion = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const [answer, setAnswer] = useState('');
    const [isResultModalOpen, setIsResultModalOpen] = useState(false)

    const currentUser = useAppSelector(getCurrentUser);
    const quiz = useAppSelector(getQuiz);
    const quizQuestion = useAppSelector(getQuizQuestion);
    const quizResult = useAppSelector(getQuizResult);

    const isLastQuestion = quizQuestion?.currentQuestionCount === quizQuestion?.questionsAmount;

    const onSelect = (e: RadioChangeEvent) => {
        setAnswer(e.target.value);
    };

    const goNextQuestion = async () => {
        form.resetFields()

        const value = {
            quizSessionId: quiz?.quizSession?.quizSessionId,
            email: currentUser?.email,
            answerId: answer,
            questionId: quizQuestion?.question.questionId,
        }

        if (isLastQuestion) {
            await quizService.quizQuestionSave(value);
            await dispatch(getQuizResultAction({
                quizSessionId: quiz?.quizSession?.quizSessionId,
                email: currentUser?.email,
            }))
            setIsResultModalOpen(true)
        } else {
            dispatch(getQuizQuestionAction(value))
        }
    };

    const goDashboard = () => {
        const emailJson = localStorage.getItem(QUIZ_EMAIL);
        const email = emailJson ? JSON.parse(emailJson) : '';

        dispatch(getCurrentUserAction(email))
        navigate(URL_HOME.path())
    }

    return (
        <div className="quizQuestion">
            <div className="quizQuestionHeader">
                {`Question ${quizQuestion?.currentQuestionCount}/${quizQuestion?.questionsAmount}`}
            </div>
            <div className="quizQuestionText">
                {quizQuestion?.question.question}
            </div>
            <Form
                form={form}
                layout="vertical"
                className="quizQuestionForm"
                requiredMark={false}
                onFinish={goNextQuestion}
            >
                <Form.Item name="answer" rules={[
                    { required: true, message: 'Please select answer' }
                ]}>
                    <Radio.Group onChange={(e) => onSelect(e)}>
                        {quizQuestion?.question.answers.map(({id, text}) =>
                            <Radio key={id} value={id} className="quizQuestionAnswer">{text}</Radio>
                        )}
                    </Radio.Group>
                </Form.Item>
                <SubmitButton
                    htmlType="submit"
                    id={isLastQuestion ? 'submitQuizButton' : 'nextQuestionButton'}
                    className="quizQuestionButton">
                    {isLastQuestion ? 'Submit' : 'Next'}
                </SubmitButton>
            </Form>
            <Modal
                className="quizResultModal"
                open={isResultModalOpen}
                footer={false}
                closable={false}
                centered
            >
                <div className="quizResultModalContent">
                    <div className="quizResultModalTitle">Congratulations!!! </div>
                    <div className="quizResultModalDescription">You have passed</div>
                    <div className="quizResultModalScore">You score is <span>{quizResult?.result}</span></div>
                    <Button type="primary" onClick={goDashboard}>Go to Dashboard</Button>
                </div>
            </Modal>
        </div>
    );
};
