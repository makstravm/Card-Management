import React from "react";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectInputPropsType } from "./types";

export const SelectInput = ({
  name,
  options,
  formik: { values, errors, touched, handleChange },
}: SelectInputPropsType) => (
  <FormControl fullWidth size="small">
    <InputLabel id={`select-label-${name}`}>{name}</InputLabel>
    <Select
      fullWidth
      size="small"
      value={values[name]}
      label={`${name}`}
      name={name}
      error={!!(touched[name] && errors[name])}
      onChange={handleChange}
    >
      {options.map(({ id, value }) => (
        <MenuItem key={id} value={value}>
          {value}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
