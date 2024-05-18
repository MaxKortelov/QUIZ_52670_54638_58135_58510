import React from 'react';
import { useAppSelector } from 'utils/hooks/useAppSelector';
import { Navigate, Outlet } from 'react-router-dom';
import { URL_HOME } from 'utils/constants/clientUrl';
import { getIsLogged } from "store/user/selectors";

export const PublicRoute = () => {
  const isLogged = useAppSelector(getIsLogged);

  console.log(isLogged)

  if (isLogged) return <Navigate to={URL_HOME.path()} />;

  return <Outlet />;
};
