import { ThunkAction } from "redux-thunk";
import Cookies from "js-cookie";

import { Endpoints } from "constants/endpoints";

import { POST } from "api/api";

import {
  LoginInitialValueType,
  RegistrationInitialValueType,
} from "helpers/types";

import { RootStateType } from "store/store";
import {
  ActionTypes,
  AuthReducerActionsTypes,
  AuthResponseType,
  AuthUserType,
  LoginFailureType,
  LoginStartedType,
  LoginSuccessType,
  RegisterFailureType,
  RegisterStartedType,
  RegisterSuccessType,
} from "./types";

const { LOGIN, REGISTER } = Endpoints;

export const loginStarted = (): LoginStartedType => ({
  type: ActionTypes.LOGIN_STARTED,
});

export const loginSuccess = (payload: AuthUserType): LoginSuccessType => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (payload: string): LoginFailureType => ({
  type: ActionTypes.LOGIN_FAILURE,
  payload,
});

export const registerStarted = (): RegisterStartedType => ({
  type: ActionTypes.REGISTER_STARTED,
});

export const registerSuccess = (): RegisterSuccessType => ({
  type: ActionTypes.REGISTER_SUCCESS,
});

export const registerFailure = (payload: string): RegisterFailureType => ({
  type: ActionTypes.REGISTER_FAILURE,
  payload,
});

export const loginAction =
  (
    values: LoginInitialValueType
  ): ThunkAction<void, RootStateType, unknown, AuthReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(loginStarted());
    try {
      const {
        data: { user, accessToken },
      } = await POST<AuthResponseType>(LOGIN, values);

      Cookies.set("token", accessToken);

      dispatch(loginSuccess(user));
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };

export const registrationAction =
  (
    values: RegistrationInitialValueType
  ): ThunkAction<void, RootStateType, unknown, AuthReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(registerStarted());
    try {
      await POST<AuthResponseType>(REGISTER, values);
      dispatch(registerSuccess());
      dispatch(loginAction(values));
    } catch (error) {
      dispatch(registerFailure(error));
    }
  };
