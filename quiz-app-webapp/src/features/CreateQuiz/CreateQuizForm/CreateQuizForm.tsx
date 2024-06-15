import React from 'react';
import {Form, Input, notification} from 'antd';

import './CreateQuizForm.scss';
import {CreateQuizFormQuestion} from "./CreateQuizFormQuestion";
import { CreateQuizModel } from "utils/dto/quiz";
import {quizService} from "services/quiz.service";
import {SubmitButton} from "components/SubmitButton";
import {required} from "../../../utils/constants/rules";
import { PlusCircleOutlined } from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import {URL_HOME} from "utils/constants/clientUrl";

export const CreateQuizForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()

    const createQuiz = async (values: CreateQuizModel) => {
        try {
            await quizService.createQuiz(values);
            notification.success({
                message: 'Success',
                description: 'Quiz was successfully created',
                duration: 4,
            })
            navigate(URL_HOME.path())
        } catch (e) {
            notification.error({
                message: 'Error',
                description: 'Something went wrong',
                duration: 4,
            });
        }
    };

    return (
        <Form<CreateQuizModel> form={form} layout="vertical" onFinish={createQuiz} className="createQuizForm">
            <Form.Item name="quizName" label="Quiz name" rules={[required, {min: 2, message: 'Min length 2'}]}>
                <Input placeholder="Quiz name" />
            </Form.Item>
            <Form.List name="questions" initialValue={[{}]} rules={[]}>
                {(fields, { add, remove }) => (
                    <div className="editCVSection">
                        <div className="createQuizFormQuestions">
                            {fields.map((field) => (
                                <CreateQuizFormQuestion
                                    key={field.key}
                                    field={field}
                                    remove={remove}
                                    canRemoveQuestion={fields.length > 1}
                                />
                            ))}
                        </div>

                        <div className="editCVSectionAction" onClick={() => add()}>
                            <PlusCircleOutlined />
                            Add question
                        </div>
                    </div>
                )}
            </Form.List>
            <SubmitButton htmlType="submit">Create quiz</SubmitButton>
        </Form>
    );
};
