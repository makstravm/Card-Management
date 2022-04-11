import { FieldTypes, OptionsType } from "store/fields/types";

export type FieldCreatorPropsType = {
  type: FieldTypes;
};

export type FormikStateType = {
  name: string;
  options: OptionsArrayType;
};

export type OptionsArrayType = OptionsType[] | [];
