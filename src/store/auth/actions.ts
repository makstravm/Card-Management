import { POST } from "../../Api/api";
import { ActionTypes } from "./types";
import Cookies from "js-cookie";

export const loginStarted = () => ({
  type: ActionTypes.LOGIN_STARTED,
});

export const loginSuccess = (payload: any) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (payload: any) => ({
  type: ActionTypes.LOGIN_FAILURE,
  payload,
});

export const registerStarted = () => ({
  type: ActionTypes.REGISTER_STARTED,
});

export const registerSuccess = (payload: any) => ({
  type: ActionTypes.REGISTER_SUCCESS,
  payload,
});

export const registerFailure = (payload: any) => ({
  type: ActionTypes.REGISTER_FAILURE,
  payload,
});

export const registrationAction =
  (values: any): any =>
  async (dispatch: any) => {
    dispatch(registerStarted());
    try {
      const response: any = await POST("register", values);
      if (response) {
        dispatch(registerSuccess(response));
        dispatch(loginAction(values));
      }
    } catch (error) {
      dispatch(registerFailure(error));
    }
  };

export const loginAction =
  (values: any): any =>
  async (dispatch: any) => {
    dispatch(loginStarted());
    try {
      const { user, accessToken }: any = await POST("login", values);
      Cookies.set("token", accessToken);
      dispatch(loginSuccess(user));
    } catch (error) {
      console.log(typeof error);

      dispatch(loginFailure(error));
    }
  };
