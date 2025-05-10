import React, {useEffect, useState} from 'react';
import './Feedbacks.scss';
import {Button, List, Rate, Spin} from "antd";
import {useNavigate} from "react-router-dom";
import { URL_FEEDBACKS_CREATE} from "utils/constants/clientUrl";
import {Feedback, Feedbacks as TFeedbacks } from "utils/dto/feedback";
import {feedbackService} from "services/feedback.service";

export const Feedbacks = () => {
    const navigate = useNavigate();
    const [feedbacks, setFeedbacks] = useState<TFeedbacks | null>(null);
    const [feedbacksIsLoaded, setFeedbacksIsLoaded] = useState(false);

    useEffect(() => {
        getFeedbacks()
    }, []);

    const getFeedbacks = async () => {
        try {
            setFeedbacksIsLoaded(true);
            const feedbacks =  await feedbackService.getFeedbacks();
            setFeedbacks(feedbacks);
        } finally {
            setFeedbacksIsLoaded(false);
        }
    }

    if (feedbacksIsLoaded) {
        return <Spin />
    }

    return (
        <div className="feedbacksPage">
            <Button
                type="primary"
                style={{width: 'fit-content', marginLeft: 'auto'}}
                onClick={() => navigate(URL_FEEDBACKS_CREATE.path())}
            >
                Leave Feedback
            </Button>

            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    pageSize: 3,
                }}
                dataSource={feedbacks?.feedbacks}
                renderItem={(item) => (
                    <List.Item key={item.id} style={{padding: '8px 0'}} >
                        <FeedbackItem feedback={item} />
                    </List.Item>
                )}
            />
        </div>
    );
};

type Props = {
    feedback: Feedback
}

export const FeedbackItem = ({feedback}: Props) => {
    return (
        <div style={{padding: '10px 20px', borderRadius: 10, backgroundColor: '#8692A640', display: 'flex', flexDirection: 'column', gap: 8}}>
            <div style={{display: 'flex', gap: 16}}>
                <div style={{width: '100%'}}>
                    <div style={{fontSize: 20}}>{feedback.headline}</div>
                    <Rate defaultValue={feedback.rate} disabled />
                </div>
                <div style={{textAlign: 'end'}}>{feedback.name} {feedback.surname}</div>
            </div>
            <div>{feedback.text}</div>
        </div>
    );
};
