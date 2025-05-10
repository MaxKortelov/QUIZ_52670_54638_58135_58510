import {useNavigate} from "react-router-dom";
import {URL_CREATE_QUIZ, URL_FEEDBACKS, URL_HOME, URL_NOTIFICATIONS, URL_SUPPORT} from "utils/constants/clientUrl";

export enum SideMenuItemsEnum {
    DASHBOARD = 'DASHBOARD',
    CREATE_QUIZ = 'CREATE_QUIZ',
    FEEDBACKS = 'FEEDBACKS',
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
    const createQuiz = {
        label: 'Add new test',
        value: SideMenuItemsEnum.CREATE_QUIZ,
        onClick: () => {
            navigate(URL_CREATE_QUIZ.path());
        },
    };
    const feedbacks = {
        label: 'Feedbacks',
        value: SideMenuItemsEnum.FEEDBACKS,
        onClick: () => {
            navigate(URL_FEEDBACKS.path());
        },
    };


    return [profile, createQuiz, feedbacks] as SideMenuItemType[];
};
