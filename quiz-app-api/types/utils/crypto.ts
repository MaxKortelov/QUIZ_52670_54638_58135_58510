export type EncryptedPassword = {
  salt: string;
  hash: Buffer;
}