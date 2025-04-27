import db from "./index";
import {DBFeedback, Feedback, mapDbFeedbackToFeedback} from "../types/feedbacks";
import {asJSONDB} from "../types/db";

export const loadFeedbacks = async (): Promise<Feedback[]> => {
  const feedbacks = await db.query('SELECT * FROM feedbacks', []);

  return (feedbacks.rows as DBFeedback[]).map(mapDbFeedbackToFeedback);
}

export const createFeedback = async (feedback: Feedback): Promise<Feedback> => {
  const result = await db.query('INSERT INTO feedbacks (name, surname, email, phone_number, rate, headline, text) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING row_to_json(feedbacks);', [feedback.name, feedback.surname, feedback.email, feedback.phoneNumber, feedback.rate, feedback.headline, feedback.text])
  return mapDbFeedbackToFeedback(asJSONDB(result.rows[0]).row_to_json as DBFeedback);
}