import React from 'react';
import { useAppDispatch } from 'utils/hooks/useAppSelector';
import { useNavigate } from "react-router-dom";
import { URL_HOME, URL_RESET_PASSWORD_EMAIL, URL_SIGN_UP } from "utils/constants/clientUrl";
import { Input, Form, notification } from 'antd';
import { SubmitButton } from 'components/SubmitButton';
import { LoginModel } from 'utils/dto/authorization';
import { signInAction } from "store/user/actions";

import '../AuthForm.scss';

export const SignInForm = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const goSignUp = () => navigate(URL_SIGN_UP.path())
    const goResetPasswordEmail = () => navigate(URL_RESET_PASSWORD_EMAIL.path())

    const onFinish = async (values: LoginModel) => {
        try {
            await dispatch(signInAction(values));
            navigate(URL_HOME.path())
        } catch (e: any) {
            notification.error({
                message: 'Error',
                description: e?.response?.data?.errors[0],
                duration: 4,
            });
        }
    };

    return (
        <div className="authPage" data-testid="SingInPage">
            <h1 className="authWelcome">Hi, Welcome!</h1>
            <h2 className="authLabel">Login to Your Account</h2>
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
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your password',
                        },
                    ]}
                >
                    <Input.Password className="authInput" placeholder="Password"/>
                </Form.Item>
                <Form.Item>
                    <SubmitButton id="authSubmit" htmlType="submit" className="authButton" showSpinner>
                        Login
                    </SubmitButton>
                </Form.Item>
            </Form>
            <p className="forgotPassword" onClick={goResetPasswordEmail}>Forgot password?</p>
            <p className="noAccount">
                Don’t have an account yet?{' '}
                <span className="noAccountSignUp" onClick={goSignUp}>Sign up</span>
            </p>
        </div>
    );
};
