import { ReactNode } from "react";
import { SchemaOf } from "yup";

import {
  LoginValidationSchemaType,
  RegisterValidationSchemaType,
  FormFieldType,
  LoginInitialValueType,
  RegistrationInitialValueType,
} from "helpers/types";
import { NavigateFunction } from "react-router-dom";

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
  titleLink: string;
  link: string;
  buttonText: string;
  onSubmit: (values: FormicValuesType, navigate: NavigateFunction) => void;
  validationSchema: SchemaOf<ValidationSchemaTypes>;
};

export type ModalPropsType = {
  title?: string;
  show: boolean;
  close: (show: boolean) => void;
  onSubmit?: () => void;
  children: ReactNode;
};
