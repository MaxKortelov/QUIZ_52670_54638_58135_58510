import {IsEmail, IsString, MinLength} from "class-validator";
import {FullQuizTableResultsDb} from "./quiz";
import {dateDifferenceFormatted} from "../utils/date.util";

export class User {
  uuid: string;
  email: string;
  username: string;
  dateCreated: string; //Date
  dateUpdated: string; //Date
  quizAmountTaken: number;
  fastestTestTime: string;
  correctAnswers: number;
}

export class NewUser {
  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export class LoginUser {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export class Email {
  @IsString()
  @IsEmail()
  email: string;
}

export class ResetPassword {
  @IsString()
  token: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class DBUser {
  uuid: string;
  email: string;
  password_hash: Buffer;
  password_salt: string;
  username: string;
  deleted: boolean
  date_created: string; // Date
  date_updated: string; // Date
  reset_password_token: string;
  verify_email_token: string;
  user_confirmed: string;
}

export function mapDbUserToUser(dbUser: DBUser, dbFullQuizTableResults: FullQuizTableResultsDb): User {
  const best_quiz_session = dbFullQuizTableResults.best_quiz_session;
  return {
    uuid: dbUser.uuid,
    email: dbUser.email,
    username: dbUser.username,
    dateCreated: dbUser.date_created,
    dateUpdated: dbUser.date_updated,
    quizAmountTaken: dbFullQuizTableResults.quiz_amount_taken,
    fastestTestTime: dateDifferenceFormatted(dbFullQuizTableResults.best_quiz_session?.date_started, dbFullQuizTableResults.best_quiz_session?.date_ended),
    correctAnswers: dbFullQuizTableResults.correct_answers
  }
}

export class VerifyEmail {
  @IsString()
  token: string;

  @IsString()
  @IsEmail()
  email: string;
}