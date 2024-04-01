import * as crypto from "crypto";
import {EncryptedPassword} from "../types/utils/crypto";
import { v4 as uuidv4 } from 'uuid';

export function encryptPassword(password: string): EncryptedPassword {
  // Creating a unique salt for a particular user
  const salt = crypto.randomBytes(16).toString('hex');

  // Hash the salt and password with 1000 iterations, 64 length and sha512 digest
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512');

  return {salt, hash}
}

export function validatePassword(password: string, hash: Buffer, salt: string): boolean {
  // To verify the same - salt (stored in DB) with same other parameters used while creating hash (1000 iterations, 64 length and sha512 digest)
  const newHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512');
  // check if hash (stored in DB) and newly generated hash (newHash) are the same
  return crypto.timingSafeEqual(hash, newHash)
}

export function uniqueId(): string {
  return uuidv4();
}