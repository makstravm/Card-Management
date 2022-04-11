import { OptionsType } from "store/fields/types";
import * as Yup from "yup";

export const createFieldValidationSchema = Yup.object().shape({
  name: Yup.string().required("Field required"),
  options: Yup.array().of(
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
            .filter((v: OptionsType) => v.id !== value.id)
            .some((v: OptionsType) => v.value === value.value)
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
