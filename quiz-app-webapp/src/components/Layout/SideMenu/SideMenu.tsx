import React from 'react';
import { useAppDispatch } from "utils/hooks/useAppSelector";
import { SideMenuItem } from "./SideMenuItem";
import { sideMenuItems, SideMenuItemsEnum } from "./items";
import { isLoggedActions } from "store/user";

import './SideMenu.scss'

type Props = {
    activeItem?: SideMenuItemsEnum;
}

export const SideMenu = ({ activeItem }: Props) => {
    const items = sideMenuItems();

    const dispatch = useAppDispatch();

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
            <SideMenuItem key={'logout'} item={LogOutItem} activeItem={activeItem} />
        </div>
    );
};
