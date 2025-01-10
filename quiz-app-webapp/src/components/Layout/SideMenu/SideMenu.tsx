import React from 'react';
import {useNavigate} from "react-router-dom";
import { useAppDispatch } from "utils/hooks/useAppSelector";
import { SideMenuItem } from "./SideMenuItem";
import { sideMenuItems, SideMenuItemsEnum } from "./items";
import { isLoggedActions } from "store/user";
import { ReactComponent as Chat } from "assets/img/svg/chat/chat.svg";
import {URL_CHAT} from "utils/constants/clientUrl";

import './SideMenu.scss'

type Props = {
    activeItem?: SideMenuItemsEnum;
}

export const SideMenu = ({ activeItem }: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const items = sideMenuItems();

    const goChat = () => navigate(URL_CHAT.path())

    const logOut = () => {
        dispatch(isLoggedActions.setIsLogged(false));
        localStorage.clear();
    };

    const LogOutItem = {
        label: 'Log Out',
        className: 'sideMenuLogOut',
        onClick: logOut
    };

    return (
        <div className="sideMenu">
            {items.map((item) => (
               <SideMenuItem key={item.value} item={item} activeItem={activeItem} />
            ))}
            <Chat onClick={goChat} className="sideMenuChat" />
            <SideMenuItem key={'logout'} item={LogOutItem} activeItem={activeItem} />
        </div>
    );
};
