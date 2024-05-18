import React from 'react';
import { useAppSelector} from "utils/hooks/useAppSelector";
import { ReactComponent as User } from "assets/img/svg/user.svg";
import { ReactComponent as Flag } from "assets/img/svg/flag.svg";
import { ReactComponent as Clock } from "assets/img/svg/clock.svg";
import { ReactComponent as Check } from "assets/img/svg/check.svg";
import { ProfileInfoStatisticItem } from "./ProfileInfoStatisticItem";
import { StatisticItem } from "./ProfileInfoStatisticItem/types";
import { getCurrentUser} from "store/user/selectors";

import './ProfileInfo.scss';

export const ProfileInfo = () => {
    const currentUser = useAppSelector(getCurrentUser)

    const profileStatistic: StatisticItem[] = [
        {
            icon: <Flag />,
            title: currentUser?.quizAmountTaken,
            description: 'Tests Passed',
        },
        {
            icon: <Clock />,
            title: currentUser?.fastestTestTime,
            description: 'Fastest Time',
        },
        {
            icon: <Check />,
            title: currentUser?.correctAnswers,
            description: 'Correct Answers',
        },
    ]

    return (
        <div className="profileInfo">
            <div className="profileInfoIcon">
                <User />
            </div>
            <div className="profileInfoContent">
                <div className="profileInfoTitle">
                    <label>{currentUser?.username}</label>
                    <p>Bonus booster 24lv</p>
                </div>
                <div className="profileInfoStatistic">
                    {profileStatistic.map(i =>
                        <ProfileInfoStatisticItem key={i.title} value={i} />)}
                </div>
            </div>
        </div>
    );
};
