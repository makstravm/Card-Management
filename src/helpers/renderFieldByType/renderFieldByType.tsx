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
  { values, handleChange, errors, touched }: FormikProps<CardType>
) => {
  switch (type) {
    case CHECKBOX:
      return <CheckBox name={name} handleChange={handleChange} />;

    case SELECT:
      return (
        <SelectInput
          name={name}
          options={options}
          value={values}
          handleChange={handleChange}
          errors={errors}
          touched={touched}
        />
      );

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
