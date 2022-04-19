import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { CheckBoxPropsType } from "./types";

export const CheckBox = ({
  name,
  checked,
  handleChange,
}: CheckBoxPropsType) => (
  <FormControlLabel
    labelPlacement="start"
    sx={{ padding: "0", margin: "0" }}
    label={name}
    control={<Checkbox name={name} checked={checked} onChange={handleChange} />}
  />
);
