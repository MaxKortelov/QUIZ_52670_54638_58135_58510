import {useNavigate} from "react-router-dom";
import {URL_CREATE_QUIZ, URL_HOME, URL_NOTIFICATIONS, URL_SUPPORT} from "utils/constants/clientUrl";

export enum SideMenuItemsEnum {
    DASHBOARD = 'DASHBOARD',
    SUPPORT = 'SUPPORT',
    NOTIFICATION = 'NOTIFICATION',
    CREATE_QUIZ = 'CREATE_QUIZ',
}

export type SideMenuItemType = {
    label: string,
    value?: SideMenuItemsEnum,
    className?: string,
    onClick: () => void,
    disabled?: boolean,
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
    } as SideMenuItemType;
    const support = {
        label: 'Support',
        value: SideMenuItemsEnum.SUPPORT,
        onClick: () => {
            navigate(URL_SUPPORT.path());
        },
        disabled: true,
    };
    const notification = {
        label: 'Notification',
        value: SideMenuItemsEnum.NOTIFICATION,
        onClick: () => {
            navigate(URL_NOTIFICATIONS.path());
        },
        disabled: true,
    };
    const createQuiz = {
        label: 'Add new test',
        value: SideMenuItemsEnum.CREATE_QUIZ,
        onClick: () => {
            navigate(URL_CREATE_QUIZ.path());
        },
    };


    return [profile, support, notification, createQuiz] as SideMenuItemType[];
};
