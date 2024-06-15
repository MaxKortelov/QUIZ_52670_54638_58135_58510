import React from 'react';
import { useNavigate } from "react-router-dom";
import { URL_LOGIN } from "utils/constants/clientUrl";
import { Button } from "antd";

import '../AuthInfo.scss';

export const ResetPasswordSuccess = () => {
    const navigate = useNavigate();

    const goLogin = () => navigate(URL_LOGIN.path())

    return (
        <div className="authPage" data-testid="ResetPasswordSuccessPage">
            <h2 className="authLabel">Password Changed</h2>
            <div className="authPageInfoText">
                <p>
                    Your password has been successfully reset
                </p>
            </div>

            <Button type="primary" className="authButton" onClick={goLogin}>Go to Login</Button>
        </div>
    );
};
