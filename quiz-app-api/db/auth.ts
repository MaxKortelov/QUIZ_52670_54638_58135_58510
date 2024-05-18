import db from "../db";
import {DBUser, mapDbUserToUser, NewUser, User} from "../types/user";
import {encryptPassword, uniqueId} from "../utils/crypto.util";
import {EncryptedPassword} from "../types/utils/crypto";
import {getFullUserQuizTableResults} from "./quiz";

export async function addUser({username, email, password}: NewUser): Promise<User> {
  const user = await findUser(email);

  if(user) throw new Error("User already exists in database");

  const {hash, salt} = encryptPassword(password);

  await db.query(
    'INSERT INTO "user" (email, password_hash, password_salt, username, deleted, date_created, date_updated) VALUES ($1, $2, $3, $4, false, current_timestamp, current_timestamp)',
    [email, hash, salt, username]
  )

  const createdUser = await findUser(email);
  return mapDbUserToUser(createdUser, await getFullUserQuizTableResults(createdUser.uuid));
}

export async function findUser(email: string): Promise<DBUser> {
  const result = await db.query('SELECT * FROM "user" WHERE email = $1', [email]);
  return result.rows[0] as DBUser;
}

export async function addResetPasswordToken(email: string): Promise<string> {
  const token = uniqueId();
  return db.query('UPDATE "user" SET reset_password_token = $1 WHERE email = $2', [token, email]).then(() => token);
}

export async function addVerifyEmailToken(email: string): Promise<string> {
  const token = uniqueId();
  return db.query('UPDATE "user" SET verify_email_token = $1 WHERE email = $2', [token, email]).then(() => token);
}

export async function resetPassword({ salt, hash }: EncryptedPassword, token: string): Promise<void> {
  await db.query('UPDATE "user" SET reset_password_token = NULL, password_hash = $1, password_salt = $2 WHERE reset_password_token = $3', [hash, salt, token]);
  return;
}

export async function verificationEmail(email: string): Promise<void> {
  await db.query('UPDATE "user" SET verify_email_token = NULL, user_confirmed = true WHERE email = $1', [email]);
  return;
}