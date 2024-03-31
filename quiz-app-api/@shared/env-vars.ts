import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT || 3001;
export const token = process.env.TOKEN;

export const databaseOptions = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
};
