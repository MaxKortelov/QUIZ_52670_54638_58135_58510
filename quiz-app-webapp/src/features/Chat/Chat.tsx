import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {AutoComplete, Empty, Input, InputRef, Spin} from "antd";
import {Message} from "./Message";
import {ReactComponent as Send} from "assets/img/svg/chat/send.svg";
import {chatService} from "services/chat.service";
import {Question, Questions} from "utils/dto/chat";

import './Chat.scss';

export const Chat = () => {
    const inputRef = useRef<InputRef | null>(null);
    const [chatHeight, setChatHeight] = useState<number>(0);

    const [defaultQuestions, setDefaultQuestions] = useState<Questions>();
    const [defaultQuestionsIsLoading, setDefaultQuestionsIsLoading] = useState(false);

    const [options, setOptions] = useState<Question[]>()
    const [search, setSearch] = useState('')
    const [chat, setChat] = useState<{ text: string, isMy: boolean }[]>([])

    useEffect(() => {
        getDefaultQuestions()
    }, []);

    const getDefaultQuestions = async () => {
        setDefaultQuestionsIsLoading(true)
        const questions = await chatService.getQuestions()
        setDefaultQuestions(questions)
        setOptions(questions.questions)
        setDefaultQuestionsIsLoading(false)
    }

    const sendMessage = async (message: string) => {
        inputRef.current?.blur()

        setChat((prev) => [...prev, {text: message, isMy: true}])

        const answer = await chatService.sendMessage(message)

        setChat((prev) => [...prev, {text: answer.answer, isMy: false}])

        setSearch('')
        setOptions(defaultQuestions?.questions)
    }

    const handleSearch = (value: string) => {
        setSearch(value);
        setOptions(defaultQuestions?.questions?.filter(({question}) =>
            question.includes(value)
        ))
    };

    const handleKeyDown = (event: any) => {
        if (event.key === "Enter" && search) {
            sendMessage(search)
        }
    };

    useLayoutEffect(() => {
        const content = document.querySelector(".mainLayoutContent");
        setChatHeight((content?.scrollHeight || 120) - 120);
    }, []);

    return defaultQuestionsIsLoading ? (<Spin />) : (
        <div className="chatPage" style={{ height: chatHeight, maxHeight: chatHeight }}>
            {chat?.length ? (
                <div className="chatContent">
                    {chat.map(({text, isMy}, index) => (
                        <Message text={text} isMy={isMy} key={index}/>
                    ))}
                </div>
            ) : (
                <Empty description="There are no messages in the chat yet." />
            )}

            <AutoComplete
                className="chatInputAutoComplete"
                options={options?.map(({question}) => ({
                    label: question,
                    value: question,
                }))}
                value={search}
                onSearch={(value) => handleSearch(value)}
                onSelect={(value) => sendMessage(value)}
                size="large"
            >
                <Input
                    ref={inputRef}
                    className="chatInput"
                    placeholder="Type your message here"
                    onKeyDown={handleKeyDown}
                    suffix={<Send className="chatInputSend" onClick={() => sendMessage(search)}/>}
                />
            </AutoComplete>
        </div>
    );
};
