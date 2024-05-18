import { makeUrl } from '../router/makeUrl';

export const URL_HOME = new makeUrl('/');
export const URL_LOGIN = new makeUrl('/login');
export const URL_SIGN_UP = new makeUrl('/sing-up');
export const URL_VERIFY = new makeUrl('/verify');
export const URL_VERIFY_INFO = new makeUrl('/verify-info');
export const URL_RESET_PASSWORD_EMAIL = new makeUrl('/reset-password/email');
export const URL_RESET_PASSWORD_EMAIL_INFO = new makeUrl('/reset-password/email/info');
export const URL_RESET_PASSWORD = new makeUrl('/reset-password/:token');
export const URL_RESET_PASSWORD_SUCCESS = new makeUrl('/reset-password/:token/success');
export const URL_FORBIDDEN = new makeUrl('/403');
export const URL_NOT_FOUND = new makeUrl('/404');
export const URL_CHANGE_PASSWORD = new makeUrl('/change-password');
export const URL_SUPPORT = new makeUrl('/support');
export const URL_NOTIFICATIONS = new makeUrl('/notifications');
export const URL_QUIZ_INTRO = new makeUrl('/quiz/:id/intro');
export const URL_QUIZ = new makeUrl('/quiz/:id');
