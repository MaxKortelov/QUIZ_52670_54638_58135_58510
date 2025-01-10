import React, { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from 'components/Layout';

import { PublicRoute } from 'components/Routes/PublicRoute';
import { PrivateRoute } from 'components/Routes/PrivateRoute';
import { SideMenuItemsEnum } from "components/Layout/SideMenu/items";

import {
  URL_HOME,
  URL_FORBIDDEN,
  URL_NOT_FOUND,
  URL_LOGIN,
  URL_SIGN_UP,
  URL_VERIFY,
  URL_VERIFY_INFO,
  URL_SUPPORT,
  URL_NOTIFICATIONS,
  URL_QUIZ_INTRO,
  URL_QUIZ,
  URL_RESET_PASSWORD_EMAIL,
  URL_RESET_PASSWORD_EMAIL_INFO,
  URL_RESET_PASSWORD,
  URL_RESET_PASSWORD_SUCCESS,
  URL_CHANGE_PASSWORD, URL_CREATE_QUIZ, URL_CHAT
} from '../constants/clientUrl';

import {
  SignInForm,
  SignUpForm,
  VerifyAccount,
  VerifyAccountInfo,
  ResetPasswordEmail,
  ResetPasswordEmailInfo,
  ResetPassword,
  ResetPasswordSuccess,
  Authorization
} from "features/Authorization";

const NotFound = lazy(() => import('features/ErrorPages/NotFound'));
const Forbidden = lazy(() => import('features/ErrorPages/Forbidden'));
const ChangePassword = lazy(() => import('features/ChangePassword'));
const Support = lazy(() => import('features/Support'));
const Notifications = lazy(() => import('features/Notifications'));
const Home = lazy(() => import('features/Home'));
const QuizIntro = lazy(() => import('features/QuizIntro'));
const Quiz = lazy(() => import('features/Quiz'));
const CreateQuiz = lazy(() => import('features/CreateQuiz'));
const Chat = lazy(() => import('features/Chat'));

export const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '*',
        element: <Navigate to={URL_NOT_FOUND.route} />,
      },
      {
        element: <Layout />,
        children: [
          {
            path: URL_NOT_FOUND.route,
            element: (
                <NotFound />
            ),
          },
          {
            path: URL_CHAT.route,
            element: (
                <Chat />
            ),
          },
          {
            path: URL_FORBIDDEN.route,
            element: (
                <Forbidden />
            ),
          },
          {
            path: URL_CHANGE_PASSWORD.route,
            element: (
                <ChangePassword />
            ),
          },
          {
            path: URL_QUIZ_INTRO.route,
            element: (
                <QuizIntro />
            ),
          },
          {
            path: URL_QUIZ.route,
            element: (
                <Quiz />
            ),
          },
        ],
      },
      {
        element: <Layout activeMenuItem={SideMenuItemsEnum.CREATE_QUIZ} />,
        children: [
          {
            path: URL_CREATE_QUIZ.route,
            element: (
                <CreateQuiz />
            ),
          },
        ],
      },
      {
        element: <Layout activeMenuItem={SideMenuItemsEnum.SUPPORT} />,
        children: [
          {
            path: URL_SUPPORT.route,
            element: (
                <Support />
            ),
          },
        ],
      },
      {
        element: <Layout activeMenuItem={SideMenuItemsEnum.NOTIFICATION} />,
        children: [
          {
            path: URL_NOTIFICATIONS.route,
            element: (
                <Notifications />
            ),
          },
        ],
      },
      {
        element: <Layout activeMenuItem={SideMenuItemsEnum.DASHBOARD} />,
        children: [
          {
            path: URL_HOME.route,
            element: (
                <Home />
            ),
          },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: '*',
        element: <Navigate to={URL_LOGIN.route} />,
      },
      {
        path: URL_LOGIN.route,
        element: (
            <Authorization>
              <SignInForm />
            </Authorization>
        ),
      },
      {
        path: URL_SIGN_UP.route,
        element: (
            <Authorization>
              <SignUpForm />
            </Authorization>
        ),
      },
      {
        path: URL_VERIFY_INFO.route,
        element: (
            <Authorization>
              <VerifyAccountInfo />
            </Authorization>
        ),
      },
      {
        path: URL_VERIFY.route,
        element: (
            <Authorization>
              <VerifyAccount />
            </Authorization>
        ),
      },
      {
        path: URL_RESET_PASSWORD_EMAIL.route,
        element: (
            <Authorization>
              <ResetPasswordEmail />
            </Authorization>
        ),
      },
      {
        path: URL_RESET_PASSWORD_EMAIL_INFO.route,
        element: (
            <Authorization>
              <ResetPasswordEmailInfo />
            </Authorization>
        ),
      },
      {
        path: URL_RESET_PASSWORD.route,
        element: (
            <Authorization>
              <ResetPassword />
            </Authorization>
        ),
      },
      {
        path: URL_RESET_PASSWORD_SUCCESS.route,
        element: (
            <Authorization>
              <ResetPasswordSuccess />
            </Authorization>
        ),
      },
    ],
  },
]);
