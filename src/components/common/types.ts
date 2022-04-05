import { ReactNode } from "react";
import { SchemaOf } from "yup";

import {
  LoginValidationSchemaType,
  RegisterValidationSchemaType,
  FormFieldType,
  LoginInitialValueType,
  RegistrationInitialValueType,
} from "helpers/types";

export type FormicValuesType = Record<string, string>;

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

export type ModalPropsType = {
  title?: string;
  show: boolean;
  close: (show: boolean) => void;
  onSubmit?: () => void;
  children: ReactNode;
};
