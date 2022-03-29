import { LoginSuccessType } from "./actions";
import { ActionTypes } from "./actionsTypes";

export type InitialStateType = {
  user: string;
};

const initialState: InitialStateType = {
  user: "",
};

const { LOGIN_SUCCESSED } = ActionTypes;

export const authReducer = (state = initialState, action: LoginSuccessType) => {
  switch (action.type) {
    case LOGIN_SUCCESSED:
      return { ...action.data };
    default:
      return state;
  }
};
