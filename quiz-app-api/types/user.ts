import {IsEmail, IsString, MinLength} from "class-validator";

export class User {
  uuid: string;
  email: string;
  username: string;
  date_created: string; //Date
  date_updated: string; //Date
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
}

export function mapDbUserToUser(dbUser: DBUser): User {
  return {
    uuid: dbUser.uuid,
    email: dbUser.email,
    username: dbUser.username,
    date_created: dbUser.date_created,
    date_updated: dbUser.date_updated
  }
}