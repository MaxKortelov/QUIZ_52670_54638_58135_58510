import {Dispatch} from "redux";
import {AuthActions, AuthActionTypes, IAuth, IAuthError, IUser} from "../../models/store/auth";
import {login} from "../../api";
import {ILoginDTO} from "../../models/login";

// effects
export const authenticate = (params: ILoginDTO) => async (dispatch: Dispatch<AuthActions>) => {
  return await login(params).then((authData) => dispatch(setAuthState(authData))).catch((err) => {
    dispatch(setAuthError(err.data.message))
  })
}

// actions
export const setAuthState = (authData: IUser): IAuth => {
  return {
    type: AuthActionTypes.AUTHENTICATE,
    payload: authData
  }
}

export const setAuthError = (errorMessge: string): IAuthError => {
  return {
    type: AuthActionTypes.ERROR,
    payload: errorMessge
  }
}