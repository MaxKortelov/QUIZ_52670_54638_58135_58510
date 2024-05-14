import {useNavigate} from "react-router-dom";
import {URL_HOME, URL_NOTIFICATIONS, URL_SUPPORT} from "utils/constants/clientUrl";

export enum SideMenuItemsEnum {
    DASHBOARD = 'DASHBOARD',
    SUPPORT = 'SUPPORT',
    NOTIFICATION = 'NOTIFICATION',
}

export type SideMenuItemType = {
    label: string,
    value?: SideMenuItemsEnum,
    className?: string,
    onClick: () => void,
}

export const sideMenuItems = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    const profile = {
        label: 'Dashboard',
        value: SideMenuItemsEnum.DASHBOARD,
        onClick: () => {
            navigate(URL_HOME.path());
        },
    };
    const changePassword = {
        label: 'Support',
        value: SideMenuItemsEnum.SUPPORT,
        onClick: () => {
            navigate(URL_SUPPORT.path());
        },
    };
    const logOutItem = {
        label: 'Notification',
        value: SideMenuItemsEnum.NOTIFICATION,
        onClick: () => {
            navigate(URL_NOTIFICATIONS.path());
        },
    };

    return [profile, changePassword, logOutItem] as SideMenuItemType[];
};
