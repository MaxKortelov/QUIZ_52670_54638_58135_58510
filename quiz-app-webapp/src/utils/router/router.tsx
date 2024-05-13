import React, { useEffect } from 'react';
import { router } from './config';
import { RouterProvider } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppSelector';
import { QUIZ_IS_LOGGED } from '../constants';
import { isLoggedActions } from "store/user";

const Router = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem(QUIZ_IS_LOGGED)) {
      dispatch(isLoggedActions.setIsLogged(true));
    } else {
      dispatch(isLoggedActions.setIsLogged(false));
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default Router;
