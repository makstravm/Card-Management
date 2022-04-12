import { ChangeEventHandler } from "react";
import { FormikStateType } from "../FieldTextCreator/types";

export type SelectOptionsPropsType = {
  values: FormikStateType;
  options: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  errors: any;
  touched: any;
};
