import { Moment } from 'moment';
import { createNewDate } from '../helpers/formatValues';

export type ProfileModel = {
  uuid: string;
  email: string;
  username: string;
  dateCreated: Moment | undefined;
  dateUpdated: Moment | undefined;
};

export type ProfileResponse = {
  uuid: string;
  email: string;
  username: string;
  dateCreated: string;
  dateUpdated: string;
};

export const profileResponseToModel = (data: ProfileResponse): ProfileModel => ({
  ...data,
  dateCreated: createNewDate(data.dateCreated),
  dateUpdated: createNewDate(data.dateUpdated),
});
