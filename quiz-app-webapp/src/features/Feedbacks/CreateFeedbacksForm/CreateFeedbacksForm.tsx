import React from 'react';
import {Form, Input, InputNumber, notification, Rate} from 'antd';
import './CreateFeedbacksForm.scss';
import {SubmitButton} from "components/SubmitButton";
import {required} from "utils/constants/rules";
import {useNavigate} from "react-router-dom";
import {URL_FEEDBACKS} from "utils/constants/clientUrl";
import {feedbackService} from "services/feedback.service";
import {Feedback} from "utils/dto/feedback";

export const CreateFeedbacksForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()

    const createQuiz = async (values: Feedback) => {
        try {
            await feedbackService.postFeedback(values);
            notification.success({
                message: 'Success',
                description: 'Feedback was successfully sent',
                duration: 4,
            })
            navigate(URL_FEEDBACKS.path())
        } catch (e) {
            notification.error({
                message: 'Error',
                description: 'Something went wrong',
                duration: 4,
            });
        }
    };

    return (
        <Form<Feedback> form={form} layout="vertical" onFinish={createQuiz} className="createFeedbackForm">
            <p onClick={() => navigate(URL_FEEDBACKS.path())}>{'<'} Back</p>
            <h2 className="createFeedbackLabel">
                Please leave  your comment here.
                <br />
                We will do our best to improve the app for you!
            </h2>

            <div style={{display: 'flex', gap: 16}}>
                <Form.Item style={{width: '100%'}} name="name" label="Name" rules={[required]}>
                    <Input placeholder="Name"/>
                </Form.Item>
                <Form.Item style={{width: '100%'}} name="surname" label="Surname" rules={[required]}>
                    <Input placeholder="Surname"/>
                </Form.Item>
            </div>
            <div style={{display: 'flex', gap: 16}}>
                <Form.Item style={{width: '100%'}} name="email" label="Email" rules={[required, {type: "email"}]}>
                    <Input placeholder="Email"/>
                </Form.Item>
                <Form.Item style={{width: '100%'}} name="phoneNumber" label="Phone number" rules={[required]}>
                    <InputNumber style={{width: '100%'}} placeholder="Phone number"/>
                </Form.Item>
            </div>

            <Form.Item style={{width: '100%'}} name="rate" label="Please rate your experience with us"
                       rules={[required]}>
                <Rate/>
            </Form.Item>

            <Form.Item style={{width: '100%'}} name="headline" label="Write a headline of your review"
                       rules={[required]}>
                <Input placeholder="Write a headline of your review"/>
            </Form.Item>

            <Form.Item style={{width: '100%'}} name="text" label="Your Rewiew" rules={[required]}>
                <Input.TextArea style={{height: 80, padding: 10}} placeholder="Type Your Message here"/>
            </Form.Item>

            <SubmitButton htmlType="submit">Send feedback</SubmitButton>
        </Form>
    );
};
