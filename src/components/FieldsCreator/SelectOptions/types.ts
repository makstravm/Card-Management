import { OptionsValidationSchemaTypes } from "helpers/types";
import { OptionsType } from "store/fields/types";
import { SchemaOf } from "yup";

export type SelectOptionsPropsType = {
  onSave: (data: OptionsStateType) => void;
  validationSchema: SchemaOf<OptionsValidationSchemaTypes>;
};

export type OptionsStateType = {
  options: OptionsType[] | [];
};
