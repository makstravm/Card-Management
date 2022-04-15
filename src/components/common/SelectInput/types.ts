import { FormikProps } from "formik";
import { CardType } from "store/cards/types";
import { OptionsType } from "store/fields/types";

export type SelectInputPropsType = {
  name: string;
  options: OptionsType[] | [];
  formik: FormikProps<CardType>;
};
