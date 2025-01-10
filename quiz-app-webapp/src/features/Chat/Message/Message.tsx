import React from 'react';
import { ReactComponent as Bot } from "assets/img/svg/chat/bot.svg";
import { ReactComponent as People } from "assets/img/svg/chat/people.svg";

import './Message.scss';

type Props = {
    text: string;
    isMy: boolean;
}

export const Message = ({ text, isMy }: Props) => {
    const isMyClass = isMy ? 'my' : '';

    return (
        <div className={`message ${isMyClass}`}>
            {!isMy && <Bot className="icon" />}
            <div className="content">{text}</div>
            {isMy && <People className="icon" />}
        </div>
    );
};
