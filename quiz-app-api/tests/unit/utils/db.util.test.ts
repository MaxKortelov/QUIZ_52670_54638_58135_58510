import {toArrayText} from "../../../utils/db.util";

describe("Test DB utils", () => {
  test("It should map array to text array - toArrayText", () => {
    const array = ["value", "test"];

    expect(toArrayText(array)).toEqual("{\"value\", \"test\"}");
  });
});