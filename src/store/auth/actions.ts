import { ThunkAction } from "redux-thunk";
import Cookies from "js-cookie";

import { Endpoints } from "constants/endpoints";

import { GET, POST } from "api/api";

import {
  LoginInitialValueType,
  RegistrationInitialValueType,
} from "helpers/types";

import { RootStateType } from "store/store";
import {
  AuthActionTypes,
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

const { LOGIN, REGISTER, USERS } = Endpoints;

export const loginStarted = (): LoginStartedType => ({
  type: AuthActionTypes.LOGIN_STARTED,
});

export const loginSuccess = (payload: AuthUserType): LoginSuccessType => ({
  type: AuthActionTypes.LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (payload: string): LoginFailureType => ({
  type: AuthActionTypes.LOGIN_FAILURE,
  payload,
});

export const registerStarted = (): RegisterStartedType => ({
  type: AuthActionTypes.REGISTER_STARTED,
});

export const registerSuccess = (): RegisterSuccessType => ({
  type: AuthActionTypes.REGISTER_SUCCESS,
});

export const registerFailure = (payload: string): RegisterFailureType => ({
  type: AuthActionTypes.REGISTER_FAILURE,
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
      } = await POST<AuthResponseType, LoginInitialValueType>(LOGIN, values);

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
      await POST<AuthResponseType, RegistrationInitialValueType>(
        REGISTER,
        values
      );
      dispatch(registerSuccess());
      dispatch(loginAction(values));
    } catch (error) {
      dispatch(registerFailure(error));
    }
  };

export const getDataUserAction =
  (
    id: string
  ): ThunkAction<void, RootStateType, unknown, AuthReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(loginStarted());
    try {
      const { data } = await GET(`${USERS}/${id}`);

      dispatch(loginSuccess(data));
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };
