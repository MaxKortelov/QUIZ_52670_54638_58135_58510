import {responseMessage} from "../../../utils/api.util";
import {ResponseMessage} from "../../../types/api.util";

describe("Test api utils", () => {
  test("It should modify message correctly - responseMessage", () => {
    const message = "test";

    expect(responseMessage(message)).toEqual({ message });
  })
})