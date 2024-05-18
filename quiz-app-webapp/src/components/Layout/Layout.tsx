import React, {ReactNode, useLayoutEffect} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import {Layout as AntdLayout} from 'antd';
import {Content} from 'antd/es/layout/layout';
import {Header} from './Header';

import './Layout.scss';
import {SideMenu} from "./SideMenu/SideMenu";
import {SideMenuItemsEnum} from "./SideMenu/items";

type Props = {
    children?: ReactNode;
    activeMenuItem?: SideMenuItemsEnum;
};

export const Layout = ({ children, activeMenuItem }: Props) => {
    const location = useLocation();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <AntdLayout className="mainLayout">
            <Header/>
            <div className="mainLayoutContainer">
                <SideMenu activeItem={activeMenuItem} />
                <Content className="mainLayoutContent">
                    {children ? children : <Outlet/>}
                </Content>
            </div>
        </AntdLayout>
    );
};
