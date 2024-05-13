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
  URL_SUPPORT,
  URL_NOTIFICATIONS,
  URL_QUIZ_INTRO,
  URL_QUIZ,
} from '../constants/clientUrl';

import { SignInForm } from "features/Authorization/SignInForm";
import { SignUpForm } from "features/Authorization/SignUpForm";
import { VerifyAccount } from "features/Authorization/VerifyAccount";

const Authorization = lazy(() => import('features/Authorization'));
const NotFound = lazy(() => import('features/ErrorPages/NotFound'));
const Forbidden = lazy(() => import('features/ErrorPages/Forbidden'));
const Support = lazy(() => import('features/Support'));
const Notifications = lazy(() => import('features/Notifications'));
const Home = lazy(() => import('features/Home'));
const QuizIntro = lazy(() => import('features/QuizIntro'));
const Quiz = lazy(() => import('features/Quiz'));

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
            path: URL_FORBIDDEN.route,
            element: (
                <Forbidden />
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
        path: URL_VERIFY.route,
        element: (
            <Authorization>
              <VerifyAccount />
            </Authorization>
        ),
      },
    ],
  },
]);
