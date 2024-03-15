import {Request} from "express";

export interface IUser {
  id: string;
  email: string;
  roles: string[],
  apiKey: string;
  password: string;
  profile: {
    "name": string;
    "company": string;
    "dob": string; //Date
    "address": string;
    "location": {
      "lat": number;
      "long": number;
    },
    password: string;
    username: string;
    createdAt: string; // Date
    updatedAt: string; // Date
  }
}

export interface IUserData {
  email: string;
  password: string
}

export interface ICustomRequest extends Request{
  user?: IUser
}