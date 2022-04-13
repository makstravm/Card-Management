import React, { ChangeEvent, useState } from "react";

import { Checkbox, FormControlLabel } from "@mui/material";
import { CardCreatorCheckboxPropsType } from "./types";

export const CardCreatorCheckbox = ({
  name,
  card,
  handleChangeCard,
}: CardCreatorCheckboxPropsType) => {
  const [valueField, setValue] = useState(false);

  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.checked);
    handleChangeCard({ ...card, [name]: e.target.checked });
  };

  return (
    <FormControlLabel
      labelPlacement="start"
      sx={{ padding: "0", margin: "0" }}
      label={name}
      control={
        <Checkbox checked={valueField} onChange={handleChangeCheckbox} />
      }
    />
  );
};
