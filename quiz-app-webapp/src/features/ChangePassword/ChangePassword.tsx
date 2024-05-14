import React from 'react';
import { useNavigate } from "react-router-dom";
import { URL_HOME } from "utils/constants/clientUrl";
import { Input, Form, notification } from 'antd';
import { SubmitButton } from 'components/SubmitButton';
import { ChangePasswordRequest } from "utils/dto/profile";
import { userService } from "services/user.service";

import './ChangePassword.scss';

export const ChangePassword = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values: ChangePasswordRequest) => {
        try {
            await userService.changePassword(values);
            navigate(URL_HOME.path());
        } catch (e: any) {
            notification.error({
                message: 'Error',
                description: e?.response?.data?.errors[0],
                duration: 4,
            });
        }
    };

    return (
        <div className="authPage">
            <h2 className="authLabel">Reset Your Password</h2>
            <Form<ChangePasswordRequest>
                form={form}
                className="authForm"
                layout="vertical"
                requiredMark={false}
                onFinish={onFinish}
            >
                <Form.Item
                    name="newPassword"
                    label="New password"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter new password',
                        },
                    ]}
                >
                    <Input.Password className="authInput" placeholder="New password"/>
                </Form.Item>
                <Form.Item
                    name="oldPassword"
                    label="Confirm new password"
                    dependencies={['newPassword']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Confirm new password',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Password entries do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password className="authInput" placeholder="Confirm new password"/>
                </Form.Item>
                <Form.Item>
                    <SubmitButton id="authSubmit" htmlType="submit" className="authButton" showSpinner>
                        Reset Password
                    </SubmitButton>
                </Form.Item>
            </Form>
        </div>
    );
};
