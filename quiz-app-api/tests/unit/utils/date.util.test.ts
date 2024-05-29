import {dateDifferenceFormatted, dateDifferenceInSeconds} from "../../../utils/date.util";

describe("Test date utils", () => {
  test("It should return date difference in seconds - dateDifferenceInSeconds", () => {
    const date1 = new Date('Wed May 29 2024 13:56:00 GMT+0200 (Central European Summer Time)');
    const date2 = new Date('Wed May 29 2024 13:56:40 GMT+0200 (Central European Summer Time)');

    expect(dateDifferenceInSeconds(date1, date2)).toEqual(40);
    expect(dateDifferenceInSeconds(date2, date1)).toEqual(40);
    expect(dateDifferenceInSeconds(undefined, date1)).toEqual(0);
    expect(dateDifferenceInSeconds(date2, undefined)).toEqual(0);
    expect(dateDifferenceInSeconds(undefined, undefined)).toEqual(0);
  });

  test("It should return date difference formatted - dateDifferenceFormatted", () => {
    const date1 = new Date('Wed May 29 2024 13:56:00 GMT+0200 (Central European Summer Time)');
    const date2 = new Date('Wed May 29 2024 13:56:40 GMT+0200 (Central European Summer Time)');

    expect(dateDifferenceFormatted(date1, date2)).toEqual("0 min 40 sec");
    expect(dateDifferenceFormatted(date2, date1)).toEqual("0 min 40 sec");

    expect(dateDifferenceFormatted(date1, undefined)).toEqual("0 min 0 sec");
    expect(dateDifferenceFormatted(undefined, date2)).toEqual("0 min 0 sec");
    expect(dateDifferenceFormatted(undefined, undefined)).toEqual("0 min 0 sec");
  });
});