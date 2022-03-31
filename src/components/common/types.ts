import { SchemaOf } from "yup";
import {
  FormFieldType,
  LoginInitialValueType,
  RegistrationInitialValueType,
} from "../../constants/types";
import {
  LoginValidationSchemaType,
  RegisterValidationSchemaType,
} from "../../helpers/types";

export type FormicValues = Record<string, string>;

export type InitialValuesFormType =
  | RegistrationInitialValueType
  | LoginInitialValueType;
export type ValidationSchemaTypes =
  | RegisterValidationSchemaType
  | LoginValidationSchemaType;
export type FormPropsType = {
  initialValues: InitialValuesFormType;
  formFields: FormFieldType[];
  title: string;
  buttonText: string;
  onSubmit: (values: InitialValuesFormType) => void;
  validationSchema: SchemaOf<ValidationSchemaTypes>;
};
