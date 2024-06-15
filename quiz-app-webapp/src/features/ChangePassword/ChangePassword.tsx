import React from 'react';
import { useAppSelector } from "utils/hooks/useAppSelector";
import { Button, notification } from 'antd';
import { getCurrentUser } from "store/user/selectors";
import { authService } from "services/auth.service";

import './ChangePassword.scss';

export const ChangePassword = () => {
    const { email } = useAppSelector(getCurrentUser)

    const sendRequestToChangePassword = async () => {
        try {
            await authService.resetPasswordGenerateToken(email);
            notification.success({
                message: 'Success',
                description: 'Request to change password was sent to your email',
                duration: 4,
            })
        } catch (e) {
            notification.error({
                message: 'Error',
                description: 'Something went wrong',
                duration: 4,
            });
        }
    };

    return (
        <div className="authPage" data-testid="ChangePasswordPage">
            <h2 className="authLabel">Reset Your Password</h2>

            <Button type="primary" className="authButton" onClick={sendRequestToChangePassword}>
                Send request to change password
            </Button>
        </div>
    );
};
