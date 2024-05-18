export type ProfileModel = {
  uuid: string;
  email: string;
  username: string;
  dateCreated: Date;
  dateUpdated: Date;
  quizAmountTaken: number,
  fastestTestTime: string,
  correctAnswers: number,
};

export type ProfileResponse = {
  uuid: string;
  email: string;
  username: string;
  dateCreated: string;
  dateUpdated: string;
  quizAmountTaken: number,
  fastestTestTime: string,
  correctAnswers: number,
};

export const profileResponseToModel = (data: ProfileResponse): ProfileModel => ({
  ...data,
  dateCreated: new Date(data.dateCreated),
  dateUpdated: new Date(data.dateUpdated),
});
