import React, { useEffect, useState } from 'react';
import { useQueryParams } from "utils/hooks/useQueryParams";
import { useNavigate } from "react-router-dom";
import { URL_LOGIN } from "utils/constants/clientUrl";
import { Button, Spin } from "antd";
import { authService } from "services/auth.service";

import '../AuthInfo.scss';

export const VerifyAccount = () => {
    const navigate = useNavigate();
    const query = useQueryParams();

    const [isVerified, setIsVerified] = useState<boolean | null>(null)

    const token = query.get("token") || "";
    const email = query.get("email") || "";

    useEffect(() => {
        verifyEmail()
    }, [email, token])

    const verifyEmail = async () => {
        if (email && token) {
            try {
                await authService.verifyEmail({ email, token });
                setIsVerified(true);
            } catch (e) {
                setIsVerified(false);
            }
        }
    }

    const goLogin = () => navigate(URL_LOGIN.path());

    return isVerified === null ? <Spin /> : (
        <div className="authPage" data-testid="VerifyAccountPage">
            {isVerified ?
                <>
                    <h2 className="authLabel">Congratulations!</h2>

                    <div className="authPageInfoText">
                        <p>Your account has been verified</p>
                    </div>
                </> : <>
                    <h2 className="authLabel">Something went wrong!</h2>

                    <div className="authPageInfoText">
                        <p>Please contact to administrator</p>
                    </div>
                </>
            }

            <Button type="primary" className="authButton" onClick={goLogin}>Go to Login</Button>
        </div>
    );
};
