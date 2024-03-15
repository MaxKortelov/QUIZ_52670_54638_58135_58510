export interface IAuthState {
  user: IUser;
  errorMessage: string;
}

export interface IUser {
  id: string;
  email: string;
  roles: string[],
  apiKey: string;
  profile: {
    "name": string;
    "company": string;
    "dob": string; //Date
    "address": string;
    "location": {
      "lat": number;
      "long": number;
    }
  },
  password: string;
  username: string;
  createdAt: string; // Date
  updatedAt: string; // Date

}

export function initialAuthData(): IAuthState {
  return {
    user: {
      id: '',
      email: '',
      roles: [],
      apiKey: '',
      password: '',
      profile: {
        name: '',
        company: '',
        dob: '', //Date
        address: '',
        location: {
          lat: 0,
          long: 0
        }
      },
      username: '',
      createdAt: '', // Date
      updatedAt: '' // Date
    },
    errorMessage: ''
  }
}


//actions

export enum AuthActionTypes {
  AUTHENTICATE = "AUTHENTICATE",
  ERROR = "ERROR"
}

export interface IAuth {
  type: AuthActionTypes.AUTHENTICATE;
  payload: IUser;
}

export interface IAuthError {
  type: AuthActionTypes.ERROR;
  payload: string;
}

export type AuthActions = IAuth | IAuthError

export const NO_VALUE = ""