import React from 'react';
import { useNavigate } from "react-router-dom";
import { URL_LOGIN } from "utils/constants/clientUrl";
import { Button } from "antd";

import '../AuthInfo.scss';

export const ResetPasswordEmailInfo = () => {
    const navigate = useNavigate();

    const goLogin = () => navigate(URL_LOGIN.path())

    return (
        <div className="authPage" data-testid="ResetPasswordEmailInfoPage">
            <h2 className="authLabel">Check Your Email Inbox</h2>
            <div className="authPageInfoText">
                <p>
                    If the details you provided are correct,
                    you should receive an email with
                    a reset link shortly
                </p>
                <p>
                    Close this window or tab and then
                    check your email
                </p>
            </div>

            <Button type="primary" className="authButton" onClick={goLogin}>Go to Login</Button>
        </div>
    );
};
