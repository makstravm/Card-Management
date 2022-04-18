import { OptionsType } from "store/fields/types";

export type FieldCreatorPropsType = {
  type: string;
};

export type FormikStateType = {
  name: string;
  required: boolean;
  options?: OptionsArrayType;
};

export type OptionsArrayType = OptionsType[];
