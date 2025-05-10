import { api } from 'utils/api';
import {Feedback} from "utils/dto/feedback";

export const getFeedbacks = async () => {
  return api.feedbacks.getFeedbacks();
};

export const postFeedback = async (data: Feedback) => {
  return api.feedbacks.postFeedback(data);
};

export const feedbackService = {
  getFeedbacks,
  postFeedback,
};
