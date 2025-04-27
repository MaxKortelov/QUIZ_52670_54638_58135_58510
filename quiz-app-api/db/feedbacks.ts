import db from "./index";
import {DBFeedback, Feedback, mapDbFeedbackToFeedback} from "../types/feedbacks";

export const loadFeedbacks = async (): Promise<Feedback[]> => {
  const feedbacks = await db.query('SELECT * FROM feedbacks', []);

  return (feedbacks.rows as DBFeedback[]).map(mapDbFeedbackToFeedback);
}