import { ChangeEventHandler } from "react";
import { FormikErrors, FormikTouched } from "formik";

export type SelectInputPropsType<V, O> = {
  value: V;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  options: O;
  name?: string;
  errors?: FormikErrors<V>;
  touched?: FormikTouched<V>;
};
