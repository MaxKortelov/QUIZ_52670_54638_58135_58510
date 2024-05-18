import React from 'react';
import { useAppSelector } from "utils/hooks/useAppSelector";
import { Header as AntdHeader } from 'antd/es/layout/layout';
import { HeaderMenu } from "./HeaderMenu";
import { getCurrentUser } from "store/user/selectors";

import './Header.scss';

export const Header = () => {
    const user = useAppSelector(getCurrentUser)

    return (
        <AntdHeader className="headerContainer">
            <label className="headerHello">{`Hello, ${user?.username}`}</label>
            <HeaderMenu />
        </AntdHeader>
    );
};
