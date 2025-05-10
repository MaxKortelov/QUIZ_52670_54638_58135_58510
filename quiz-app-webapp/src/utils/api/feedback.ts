import { axiosInstance } from './axiosInstance';
import { Feedback, Feedbacks} from "../dto/feedback";

export const getFeedbacks = () => {
  return axiosInstance.get<Feedbacks>('/feedbacks').then((res) => res?.data);
};

export const postFeedback = (data: Feedback) => {
  return axiosInstance.post<Feedback>('/feedbacks', data).then((res) => res?.data);
};
