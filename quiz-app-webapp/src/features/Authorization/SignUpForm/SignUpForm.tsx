import React from 'react';
import { useAppDispatch } from 'utils/hooks/useAppSelector';
import { useNavigate } from "react-router-dom";
import { URL_VERIFY_INFO } from "utils/constants/clientUrl";
import { Input, Form, notification, Checkbox } from 'antd';
import { SubmitButton } from 'components/SubmitButton';
import { LoginModel } from 'utils/dto/authorization';
import { signUpAction } from "store/user/actions";

import '../AuthForm.scss';

export const SignUpForm = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onFinish = async (values: LoginModel) => {
        try {
            await dispatch(signUpAction(values));
            navigate(URL_VERIFY_INFO.path());
        } catch (e: any) {
            notification.error({
                message: 'Error',
                description: e.response.data.errors[0],
                duration: 4,
            });
        }
    };

    return (
        <div className="authPage" data-testid="SingUpPage">
            <h2 className="authLabel">Register New Account</h2>
            <Form<LoginModel>
                form={form}
                className="authForm"
                layout="vertical"
                requiredMark={false}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    label="Full name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your full name',
                        },
                    ]}
                >
                    <Input className="authInput" placeholder="Full name"/>
                </Form.Item>
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
                <Form.Item
                    name="newPasswordConfirmation"
                    label="Confirm password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Confirm your password',
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
                    <Input.Password className="authInput" placeholder="Confirm password"/>
                </Form.Item>
                <Form.Item
                    name="agreement"
                    className="authFormItemCheckbox"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}>
                    <Checkbox>
                        <p className="noAccount">Agree to our Terms of Use and Privacy Policy</p>
                    </Checkbox>
                </Form.Item>
                <Form.Item>
                    <SubmitButton id="authSubmit" htmlType="submit" className="authButton" showSpinner>
                        Register
                    </SubmitButton>
                </Form.Item>
            </Form>
        </div>
    );
};
