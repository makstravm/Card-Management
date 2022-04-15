import React from "react";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { OptionsType } from "store/fields/types";
import { CardType } from "store/cards/types";

import { SelectInputPropsType } from "./types";

export const SelectInput = ({
  name,
  options,
  value,
  errors,
  touched,
  handleChange,
}: SelectInputPropsType<CardType, OptionsType[]>) => (
  <FormControl fullWidth size="small">
    <InputLabel id={`select-label-${name}`}>{name}</InputLabel>
    <Select
      fullWidth
      size="small"
      value={value[name]}
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
