import { AddNameACType } from "./actions";
import { auth } from "./actionsTypes";

export type InitialStateType = {
  name: string;
};

const initialState: InitialStateType = {
  name: "",
};

export const authReducer = (state = initialState, action: AddNameACType) => {
  switch (action.type) {
    case auth.ADD_NAME:
      return { ...state, name: action.name };

    default:
      return state;
  }
};
