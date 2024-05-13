import React from 'react';
import { useNavigate } from "react-router-dom";
import { URL_LOGIN } from "utils/constants/clientUrl";
import { Button } from "antd";
import { SubmitButton } from "components/SubmitButton";

import '../AuthInfo.scss';

export const VerifyAccount = () => {
    const navigate = useNavigate();

    const resendEmail = () => {}

    const goLogin = () => navigate(URL_LOGIN.path());

    return (
        <div className="authPage">
            <h2 className="authLabel">Verify Your Account</h2>

            <div className="authPageInfoText">
                <p>A verification email has been sent to your email address</p>
                <p>Please check your inbox and confirm your account by clicking the verification link</p>
                <p>
                    If you missed it  check your spam folder or click below to resend your verification email
                </p>
            </div>

            <SubmitButton id="authSubmit" className="authButton" showSpinner onClick={resendEmail}>
                Re-send Email
            </SubmitButton>

            <Button type="primary" className="authButton" onClick={goLogin}>Go to Login</Button>
        </div>
    );
};
