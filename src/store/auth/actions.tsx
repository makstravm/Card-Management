import { axiosInstance } from "../../Api/api";
import { ActionTypes } from "./actionsTypes";

export type LoginSuccessType = {
  type: ActionTypes.LOGIN_SUCCESSED;
  data: any;
};

export const loginSuccess = (data: any): LoginSuccessType => ({
  type: ActionTypes.LOGIN_SUCCESSED,
  data,
});

export const loginAction =
  (values: any): any =>
  async (dispatch: any) => {
    const response: any = await axiosInstance.post("login", values);
    localStorage.token = response.accessToken;
    dispatch(loginSuccess(response));
  };

export const registrationAction =
  (values: any): any =>
  async (dispatch: any) => {
    const response: any = await axiosInstance.post("register", values);
    if (response) {
      dispatch(loginAction(values));
    }
  };
