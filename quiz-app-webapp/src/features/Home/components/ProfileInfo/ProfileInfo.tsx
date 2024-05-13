import React from 'react';
import { useAppSelector} from "utils/hooks/useAppSelector";
import { ReactComponent as User } from "assets/img/svg/user.svg";
import { ReactComponent as Flag } from "assets/img/svg/flag.svg";
import { ReactComponent as Clock } from "assets/img/svg/clock.svg";
import { ReactComponent as Check } from "assets/img/svg/check.svg";
import { ProfileInfoStatisticItem } from "./ProfileInfoStatisticItem";
import { ProfileData } from "./ProfileInfoStatisticItem/types";
import { getCurrentUser} from "store/user/selectors";

import './ProfileInfo.scss';

const profileInfoData: ProfileData = {
    progress: 70,
    statistic: [
        {
            icon: <Flag />,
            title: '2',
            description: 'Tests Passed',
        },
        {
            icon: <Clock />,
            title: '10min',
            description: 'Fastest Time',
        },
        {
            icon: <Check />,
            title: '19',
            description: 'Correct Answers',
        },
    ]
}

export const ProfileInfo = () => {
    const currentUser = useAppSelector(getCurrentUser)

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
                <div className="profileInfoProgressBar">
                    <div
                        className="profileInfoProgressBarValue"
                        style={{ width: `${profileInfoData.progress}%` }}
                    />
                </div>
                <div className="profileInfoStatistic">
                    {profileInfoData.statistic.map(i =>
                        <ProfileInfoStatisticItem key={i.title} value={i} />)}
                </div>
            </div>
        </div>
    );
};
