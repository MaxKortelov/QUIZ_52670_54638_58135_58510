import React from 'react';
import { StatisticItem } from "./types";

import './ProfileInfoStatisticItem.scss';

type Props = {
    value: StatisticItem
}

export const ProfileInfoStatisticItem = ({ value }: Props) => {
    const { icon, title, description } = value;

    return (
        <div className="profileInfoStatisticItem">
            {icon}
            <div className="profileInfoStatisticItemContent">
                <label className="profileInfoStatisticItemTitle">{title}</label>
                <p className="profileInfoStatisticItemDescription">{description}</p>
            </div>
        </div>
    );
};
