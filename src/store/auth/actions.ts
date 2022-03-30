import { InitialValuesFormType } from "./../../components/common/types";
import { POST } from "../../Api/api";
import {
  ActionTypes,
  AuthResponseType,
  AuthUserType,
  InitialStateAuthType,
} from "./types";
import Cookies from "js-cookie";
import {
  LoginInitialValueType,
  RegistrationInitialValueType,
} from "../../constants/types";
import { AxiosResponse, AxiosResponseHeaders } from "axios";

export const loginStarted = () => ({
  type: ActionTypes.LOGIN_STARTED,
});

export const loginSuccess = (payload: AuthUserType) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (payload: string) => ({
  type: ActionTypes.LOGIN_FAILURE,
  payload,
});

export const registerStarted = () => ({
  type: ActionTypes.REGISTER_STARTED,
});

export const registerSuccess = (payload: AuthUserType) => ({
  type: ActionTypes.REGISTER_SUCCESS,
  payload,
});

export const registerFailure = (payload: string) => ({
  type: ActionTypes.REGISTER_FAILURE,
  payload,
});

export const registrationAction =
  (values: RegistrationInitialValueType) => async (dispatch: any) => {
    dispatch(registerStarted());
    try {
      const { user }: AuthResponseType = await POST("register", values);
      dispatch(registerSuccess(user));
      dispatch(loginAction(values));
    } catch (error) {
      dispatch(registerFailure(error));
    }
  };

export type AuthResponseType = {
  accessToken: string | null;
  user: AuthUserType | null;
};

export const loginAction =
  (values: LoginInitialValueType) => async (dispatch: any) => {
    dispatch(loginStarted());
    try {
      const response = await POST("login", values);
      const { user, accessToken } = response;
      Cookies.set("token", accessToken);
      dispatch(loginSuccess(user));
    } catch (error) {
      console.log(typeof error);

      dispatch(loginFailure(error));
    }
  };
