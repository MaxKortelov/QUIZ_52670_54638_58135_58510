import { useNavigate } from 'react-router-dom';
import { URL_CHANGE_PASSWORD, URL_HOME } from 'utils/constants/clientUrl';
import { MenuItem } from "utils/types/menuItems";

export const getItems = (logOut: () => void) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const dashboard = {
    label: 'Dashboard',
    className: 'headerMenuItem',
    id: 'dashboard',
    key: 'dashboard',
    onClick: () => {
      navigate(URL_HOME.path());
    },
  };
  const changePassword = {
    label: 'Change password',
    className: 'headerMenuItem',
    id: 'changePassword',
    key: 'changePassword',
    onClick: () => {
      navigate(URL_CHANGE_PASSWORD.path());
    },
  };
  const logOutItem = {
    label: 'Log out',
    className: 'headerMenuItem',
    id: 'logOut',
    key: 'logOut',
    onClick: () => {
      logOut();
    },
  };

  return [dashboard, changePassword, logOutItem] as MenuItem[];
};
