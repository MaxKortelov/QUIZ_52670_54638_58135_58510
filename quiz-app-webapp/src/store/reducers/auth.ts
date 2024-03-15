import {AuthActions, AuthActionTypes, IAuthState, initialAuthData, NO_VALUE} from "../../models/store/auth";

export const initialAuthState: IAuthState = initialAuthData();

export const authReducer = (state = initialAuthState, action: AuthActions): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.AUTHENTICATE:
      return {...state, user: action.payload, errorMessage: NO_VALUE};
    case AuthActionTypes.ERROR:
      return {...state, errorMessage: action.payload};
    default:
      return state;
  }
};
