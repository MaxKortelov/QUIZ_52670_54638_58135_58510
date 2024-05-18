import moment, { Moment } from 'moment';

export enum dateFormats {
  dateOnly = 'DD.MM.YYYY',
  monthYear = 'MM.YYYY',
  yearOnly = 'YYYY',

  sendWithoutTime = 'YYYY-MM-DD',
}

export const formatDate = (
  date: Moment | undefined,
  format: dateFormats = dateFormats.dateOnly,
) => {
  if (date) {
    return moment(date).format(format);
  }
  return undefined;
};

export const createNewDate = (date: string) => {
  if (date) {
    return moment(date);
  }
  return undefined;
};

export const formatValueToSelect = (defaultValue: any) => {
  if (defaultValue?.value) {
    return defaultValue?.value;
  }
  return undefined;
};
