import React, { useState } from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { CardCreatorSelectPropsType } from "./types";

export const CardCreatorSelect = ({
  name,
  options,
  card,
  handleChangeCard,
}: CardCreatorSelectPropsType) => {
  const [valueField, setValue] = useState("");

  const handleChange = (e: SelectChangeEvent) => {
    setValue(e.target.value);
    handleChangeCard({ ...card, [name]: e.target.value });
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="select-label-card">{name}</InputLabel>
      <Select
        value={valueField}
        onChange={handleChange}
        // size="small"
        label={name}
        labelId="select-label-card"
      >
        {options.map(({ id, value }) => (
          <MenuItem key={id} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
