import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { URL_RESET_PASSWORD_SUCCESS } from "utils/constants/clientUrl";
import { Input, Form, notification } from 'antd';
import { SubmitButton } from 'components/SubmitButton';
import { ResetPasswordRequest } from 'utils/dto/authorization';
import { authService } from "services/auth.service";

import '../AuthForm.scss';

export const ResetPassword = () => {
    const { token } = useParams()
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values: ResetPasswordRequest) => {
        try {
            token && await authService.resetPassword({ password: values.password, token, email: '' });
            token && navigate(URL_RESET_PASSWORD_SUCCESS.path({ token }))
        } catch (e: any) {
            notification.error({
                message: 'Error',
                description: e.response.data.errors[0],
                duration: 4,
            });
        }
    };

    return (
        <div className="authPage">
            <h2 className="authLabel">Reset Your Password</h2>
            <Form<ResetPasswordRequest>
                form={form}
                className="authForm"
                layout="vertical"
                requiredMark={false}
                onFinish={onFinish}
            >
                <Form.Item
                    name="password"
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
                    name="newPasswordConfirmation"
                    label="Confirm new password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Confirm new password',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
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
