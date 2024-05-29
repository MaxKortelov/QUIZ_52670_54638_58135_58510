import {encryptPassword, uniqueId, validatePassword} from "../../../utils/crypto.util";

describe("Test crypto utils", () => {
  test("It should encrypt password correctly - encryptPassword", () => {
    const password = "12345678";

    const {salt, hash} = encryptPassword(password);

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();

    expect(Buffer.isBuffer(hash)).toBeTruthy();
  });

  test("It should validate password, encrypted with encryptPassword correctly - validatePassword", () => {
    const password1 = "12345678";
    const password2 = "87654321";

    const {salt, hash} = encryptPassword(password1);

    expect(validatePassword(password1, hash, salt)).toBeTruthy();
    expect(validatePassword(password2, hash, salt)).toBeFalsy();
  });

  test("It should return unique id - uniqueId", () => {
    expect(typeof uniqueId()).toEqual("string");

    const idFirst = uniqueId();
    const idSecond = uniqueId();
    const idThird = uniqueId();

    expect(idFirst).not.toEqual(idSecond);
    expect(idSecond).not.toEqual(idThird);
    expect(idFirst).not.toEqual(idThird);
  });
})