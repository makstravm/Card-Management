import React, { ChangeEvent, useState } from "react";

import { TextField } from "@mui/material";
import { CardCreatorTextPropsType } from "./types";

export const CardCreatorText = ({
  name,
  required,
  card,
  handleChangeCard,
}: CardCreatorTextPropsType) => {
  const [valueField, setValue] = useState("");

  const [error, setError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    handleChangeCard({ ...card, [name]: e.target.value });
    if (!e.target.value && required) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <TextField
      fullWidth
      required={required}
      size="small"
      label={name}
      value={valueField}
      error={error}
      helperText={error && "Field don't be empty"}
      onChange={handleChange}
    />
  );
};
