import {IsEmail, IsString, MinLength} from "class-validator";

export class User {
  uuid: string;
  email: string;
  username: string;
  dateCreated: string; //Date
  dateUpdated: string; //Date
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

export function mapDbUserToUser(dbUser: DBUser): User {
  return {
    uuid: dbUser.uuid,
    email: dbUser.email,
    username: dbUser.username,
    dateCreated: dbUser.date_created,
    dateUpdated: dbUser.date_updated
  }
}

export class VerifyEmail {
  @IsString()
  token: string;

  @IsString()
  @IsEmail()
  email: string;
}