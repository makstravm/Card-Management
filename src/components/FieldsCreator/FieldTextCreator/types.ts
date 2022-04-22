import { FieldStateType, OptionsType } from "store/fields/types";

export type FieldCreatorPropsType = {
  type: string;
  field: FieldStateType;
};

export type FormikStateType = {
  name: string;
  required: boolean;
  options?: OptionsType[];
};
