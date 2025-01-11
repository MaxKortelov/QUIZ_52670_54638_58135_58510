import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'utils/hooks/useAppSelector';
import { Navigate, Outlet } from 'react-router-dom';
import { URL_LOGIN } from 'utils/constants/clientUrl';
import { Spin } from 'antd';
import { getCurrentUserAction } from 'store/user/actions';
import { getCurrentUser, getCurrentUserIsLoading, getIsLogged } from 'store/user/selectors';
import { QUIZ_EMAIL } from "utils/constants";

export const PrivateRoute = () => {
  const isLogged = useAppSelector(getIsLogged);
  const isLoading = useAppSelector(getCurrentUserIsLoading);
  const user = useAppSelector(getCurrentUser);

  const dispatch = useAppDispatch();

  const emailJson = localStorage.getItem(QUIZ_EMAIL);
  const email = emailJson ? JSON.parse(emailJson) : '';

  useEffect(() => {
    if (isLogged && email) {
      dispatch(getCurrentUserAction(email));
    }
  }, [isLogged]);

  if (isLogged === null) return null;

  if (!isLogged) return <Navigate to={URL_LOGIN.path()} />;

  return isLoading || !user ? <Spin /> : <Outlet />;
};

