import {differenceInSeconds} from "date-fns"

type InputDateType = Date | string | null | undefined;

export function dateDifferenceInSeconds(dateFrom: InputDateType, dateTo: InputDateType): number {
  if(!dateFrom || !dateTo) {
    return 0;
  }

  return Math.abs(differenceInSeconds(dateFrom, dateTo));
}

export function dateDifferenceFormatted(dateFrom: InputDateType, dateTo: InputDateType): string /* "24 min 12 sec" */ {
  if(!dateFrom || !dateTo) {
    return "0 min 0 sec";
  }

  const difInSeconds = dateDifferenceInSeconds(dateFrom, dateTo);
  const minutes = Number((difInSeconds / 60).toFixed());
  const seconds = difInSeconds % 60;
  return `${minutes} min ${seconds} sec`;
}