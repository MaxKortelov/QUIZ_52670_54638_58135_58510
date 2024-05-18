import React from 'react';
import {SideMenuItemsEnum, SideMenuItemType} from "../items";

import './SideMenuItem.scss'

type Props = {
    item: SideMenuItemType;
    activeItem?: SideMenuItemsEnum;
}

export const SideMenuItem = ({ item, activeItem }: Props) => {
    const { label, value, className, onClick, disabled } = item;

    const extraClass = className ? className : '';
    const isActive = activeItem && value === activeItem ? 'active' : '';
    const isDisabled = disabled ? 'disabled' : '';

    return (
        <div
            className={`sideMenuItem ${extraClass} ${isActive} ${isDisabled}`}
            onClick={() => !disabled && onClick()}
        >
            {label}
        </div>
    );
};
