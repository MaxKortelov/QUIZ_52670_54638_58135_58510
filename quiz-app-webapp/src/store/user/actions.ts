import { Dispatch } from 'redux';
import { userService } from 'services/user.service';
import { isLoggedActions, userActions, userIsLoadingActions } from './reducer';
import { LoginModel } from "utils/dto/authorization";
import { submitActions } from "../submit";
import { authService } from "services/auth.service";

export const signInAction = (params: LoginModel) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(submitActions.setSubmitIsLoading(true));
      await authService.login(params);
      dispatch(isLoggedActions.setIsLogged(true));
    } catch (e) {
      dispatch(isLoggedActions.setIsLogged(false));
      throw e;
    } finally {
      dispatch(submitActions.setSubmitIsLoading(false));
    }
  };
};

export const signUpAction = (params: LoginModel) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(submitActions.setSubmitIsLoading(true));
      await authService.register(params);
    } catch (e) {
      throw e;
    } finally {
      dispatch(submitActions.setSubmitIsLoading(false));
    }
  };
};


export const getCurrentUserAction = (email: string) => {
  const { setUser } = userActions;
  const { setIsLoading } = userIsLoadingActions;

  return async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const user = await userService.getCurrentUser(email);
      dispatch(setUser(user));
    } catch (e) {
      dispatch(isLoggedActions.setIsLogged(false));
      console.log(e);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};
