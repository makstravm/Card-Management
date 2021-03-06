import * as Yup from "yup";
import { OptionsType } from "store/fields/types";

export const switchedFieldCreateValidation = (type: string) =>
  (type === "select" && createFieldValidationSchema) ||
  createFieldSelectValidationSchema;

const createFieldValidationSchema = Yup.object().shape({
  name: Yup.string().required("Field required"),
  options: Yup.array()
    .min(2, "Minimum 2 options")
    .of(
      Yup.object()
        .shape({
          value: Yup.string().required("No empty field"),
        })
        .test("unique", function array(value) {
          if (!value || !value.value) {
            return true;
          }
          if (
            this.parent
              .filter((val: OptionsType) => val.id !== value.id)
              .some((val: OptionsType) => val.value === value.value)
          ) {
            throw this.createError({
              path: `${this.path}.value`,
              message: "Duplicate option",
            });
          }

          return true;
        })
    ),
});

const createFieldSelectValidationSchema = Yup.object().shape({
  name: Yup.string().required("Field required"),
});
