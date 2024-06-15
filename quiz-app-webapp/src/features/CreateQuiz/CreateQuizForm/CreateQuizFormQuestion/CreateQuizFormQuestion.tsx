import React from 'react';
import { Form, FormListFieldData, Input, Radio } from 'antd';

import './CreateQuizFormQuestion.scss';
import {required} from "utils/constants/rules";
import {MinusCircleOutlined, PlusCircleOutlined} from '@ant-design/icons';

type Props = {
    field: FormListFieldData;
    remove: (index: number) => void;
    canRemoveQuestion: boolean;
};

export const CreateQuizFormQuestion = ({ field, remove, canRemoveQuestion }: Props) => {
    console.log(field.key)
    return (
        <div className="createQuizQuestionSection" key={field.key}>
            <div className="createQuizQuestionField">
                <Form.Item
                    className="createQuizQuestionItem"
                    label="Question"
                    name={[field.name, 'question']}
                    rules={[required]}
                >
                    <Input placeholder="Question" />
                </Form.Item>

                <Form.List name={[field.name, 'answers']} initialValue={[{}, {}, {}]}>
                    {(answerFields, { add, remove }) => (
                        <div className="editCVSection">
                            <div className="">
                                {answerFields.map((field, index) => (
                                    <div className="answerSection" key={field.name}>
                                        <Form.Item
                                            className="createQuizQuestionItem"
                                            label={`Answer ${index + 1}`}
                                            name={[field.name, 'answer']}
                                            rules={[required]}
                                        >
                                            <Input placeholder="Question"/>
                                        </Form.Item>
                                        {answerFields.length > 2 && <div
                                            className="editCVSectionAction delete"
                                            onClick={() => remove(field.name)}
                                        >
                                            <MinusCircleOutlined/>
                                            Remove answer
                                        </div>}
                                    </div>
                                ))}
                                <Form.Item label="Correct answer" name={[field.name, 'correctAnswer']} rules={[required]}>
                                    <Radio.Group options={answerFields.map((i, index) => ({label: index+1, value: index}))} />
                                </Form.Item>
                                {answerFields.length > 1 && answerFields.length < 4 && <div className="editCVSectionAction" onClick={() => add()}>
                                    <PlusCircleOutlined/>
                                    Add answer
                                </div>}
                            </div>
                        </div>
                    )}
                </Form.List>

                {canRemoveQuestion && <div
                    className="editCVSectionAction delete"
                    onClick={() => remove(field.name)}
                >
                    <MinusCircleOutlined/>
                    Remove question
                </div>}
            </div>
        </div>
    );
};
