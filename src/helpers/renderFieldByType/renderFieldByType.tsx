import React from "react";

import { TextField } from "@mui/material";

import { TypesFields } from "constants/typesFields";
import { CheckBox } from "components/common/CheckBox/CheckBox";
import { FieldStateType } from "store/fields/types";
import { FormikProps } from "formik";
import { CardType } from "store/cards/types";
import { SelectInput } from "components/common/SelectInput/SelectInput";

const { SELECT, CHECKBOX } = TypesFields;

export const renderFieldByType = (
  { name, type, options, required }: FieldStateType,
  formik: FormikProps<CardType>
) => {
  const { handleChange, errors, touched } = formik;

  switch (type) {
    case CHECKBOX:
      return (
        <CheckBox
          name={name}
          handleChange={handleChange}
          disableRipple={false}
        />
      );

    case SELECT:
      return <SelectInput name={name} options={options} formik={formik} />;

    default:
      return (
        <TextField
          fullWidth
          size="small"
          label={`${name}${required ? "*" : ""}`}
          name={name}
          error={!!(touched[name] && errors[name])}
          helperText={touched[name] && errors[name]}
          onChange={handleChange}
        />
      );
  }
};
