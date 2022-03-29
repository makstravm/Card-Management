import { auth } from "./actionsTypes";

export type AddNameACType = {
  type: auth.ADD_NAME;
  name: string;
};

export const addNameAC = (name: string): AddNameACType => ({
  type: auth.ADD_NAME,
  name,
});
