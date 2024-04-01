import db from "../db";
import {DBUser, mapDbUserToUser, NewUser, User} from "../types/user";
import {encryptPassword} from "../utils/crypto";

// export function addUser({username, email, password}: NewUser): User {
export async function addUser({username, email, password}: NewUser): Promise<User> {
  const user = await findUser(email);

  if(user) throw new Error("User already exists in database");

  const {hash, salt} = encryptPassword(password);

  await db.query(
    'INSERT INTO "user" (email, password_hash, password_salt, username, deleted, date_created, date_updated) VALUES ($1, $2, $3, $4, false, current_timestamp, current_timestamp)',
    //@ts-ignore
    [email, hash, salt, username]
  )

  const createdUser = await findUser(email);
  return mapDbUserToUser(createdUser);
}

export async function findUser(email: string): Promise<DBUser> {
  const result = await db.query('SELECT * FROM "user" WHERE email = $1', [email]);
  return result.rows[0] as DBUser;
}