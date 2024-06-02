import dotenv from "dotenv";
import {ClientConfig} from "pg";

dotenv.config();

export const port = Number(process.env.PORT) || 3001;

export const ORIGIN = process.env.ALLOWED_ORIGIN;

export const databaseOptions: ClientConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  // ssl: true
};

export const nodeMailerOptions = {
  mailSender: process.env.NODEMAILER_SENDER as string,
  mailSenderName: process.env.NODEMAILER_SENDER_NAME as string,
  service: process.env.NODEMAILER_SERVICE as string,
  host: process.env.NODEMAILER_HOST as string,
  port: Number(process.env.NODEMAILER_PORT),
  secure: Boolean(process.env.NODEMAILER_SECURE),
  user: process.env.NODEMAILER_USER as string,
  password: process.env.NODEMAILER_PASSWORD as string,
}

export const TIME_PER_QUESTION = Number(process.env.TIME_PER_QUESTION)
export const ATTEMPTS_PER_QUIZ = Number(process.env.ATTEMPTS_PER_QUIZ)
