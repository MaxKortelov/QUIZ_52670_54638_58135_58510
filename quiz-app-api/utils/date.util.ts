import {differenceInSeconds} from "date-fns"

type InputDateType = Date | string | null | undefined;

export function dateDifference(dateFrom: InputDateType, dateTo: InputDateType): string /* "24 min 12 sec" */ {
  if(!dateFrom || !dateTo) {
    return "0 min 0 sec";
  }

  const difInSeconds = differenceInSeconds(dateFrom, dateTo);
  const minutes = (difInSeconds / 60).toFixed();
  const seconds = difInSeconds % 60;
  return `${minutes} min ${seconds} sec`;
}