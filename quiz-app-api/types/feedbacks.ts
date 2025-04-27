import {IsEmail, IsString, MinLength, IsNumber} from "class-validator";

export class Feedback {
  uuid: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsNumber()
  phoneNumber: string;

  @IsNumber()
  rate: number;

  @IsString()
  headline: string;

  @IsString()
  @MinLength(5)
  text: string;
}


export class DBFeedback {
  uuid: string;
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  rate: number;
  headline: string;
  text: string;
}

export function mapDbFeedbackToFeedback(dbFeedback: DBFeedback): Feedback {
  return {
    uuid: dbFeedback.uuid,
    name: dbFeedback.name,
    surname: dbFeedback.surname,
    email: dbFeedback.email,
    phoneNumber: dbFeedback.phone_number,
    rate: dbFeedback.rate,
    headline: dbFeedback.headline,
    text: dbFeedback.text,
  }
}