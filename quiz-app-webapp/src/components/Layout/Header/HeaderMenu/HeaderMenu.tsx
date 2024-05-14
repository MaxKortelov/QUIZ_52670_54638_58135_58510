import React from 'react';
import { useAppDispatch, useAppSelector } from 'utils/hooks/useAppSelector';
import { Dropdown } from "antd";
import { ReactComponent as User } from "assets/img/svg/user.svg";
import { isLoggedActions } from "store/user";
import { getCurrentUser } from "store/user/selectors";
import { getItems } from "./items";

import './HeaderMenu.scss';

export const HeaderMenu = () => {
    const dispatch = useAppDispatch();

    const currentUser = useAppSelector(getCurrentUser)

    const logOut = () => {
        dispatch(isLoggedActions.setIsLogged(false));
        localStorage.clear();
    };

    const items = getItems(logOut);

    return (
        <Dropdown className="headerMenu" menu={{items}} trigger={['click']}>
          <div className="headerProfile">
            <User/>
            <p className="headerProfileName">{currentUser?.username}</p>
          </div>
        </Dropdown>
    );
};
