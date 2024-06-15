import React from 'react';
import { useNavigate } from "react-router-dom";
import { URL_RESET_PASSWORD_EMAIL_INFO } from "utils/constants/clientUrl";
import { Input, Form, notification } from 'antd';
import { SubmitButton } from 'components/SubmitButton';
import { LoginModel } from 'utils/dto/authorization';
import { authService } from "services/auth.service";

import '../AuthForm.scss';

export const ResetPasswordEmail = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values: LoginModel) => {
        try {
            await authService.resetPasswordGenerateToken(values.email);
            navigate(URL_RESET_PASSWORD_EMAIL_INFO.path())
        } catch (e: any) {
            notification.error({
                message: 'Error',
                description: e.response.data.errors[0],
                duration: 4,
            });
        }
    };

    return (
        <div className="authPage" data-testid="ResetPasswordEmailPage">
            <h2 className="authLabel">Reset Your Password</h2>
            <Form<LoginModel>
                form={form}
                className="authForm"
                layout="vertical"
                requiredMark={false}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    label="Email address"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your email',
                        },
                    ]}
                >
                    <Input className="authInput" placeholder="Email address"/>
                </Form.Item>
                <Form.Item>
                    <SubmitButton id="authSubmit" htmlType="submit" className="authButton" showSpinner>
                        Send Password Reset Link
                    </SubmitButton>
                </Form.Item>
            </Form>
        </div>
    );
};
