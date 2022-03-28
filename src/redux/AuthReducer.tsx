import { AddNameACType } from "./Action";

export type InitialStateType = {
  name: string;
};

const initialState: InitialStateType = {
  name: "",
};

export const authReducer = (state = initialState, action: AddNameACType) => {
  switch (action.type) {
    case "ADD-NAME":
      return { ...state, name: action.name };

    default:
      return state;
  }
};
