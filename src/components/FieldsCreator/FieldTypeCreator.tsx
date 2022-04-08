import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { FieldTypes } from "store/fields/types";
import { FieldCreator } from "./FieldTextCreator/FieldCreator";

export const fieldTypes = ["text", "checkbox", "select"];

export const FieldTypeCreator = () => {
  const [typeField, setTypeField] = useState<FieldTypes>("text");

  const changeTypeField = (event: SelectChangeEvent) =>
    setTypeField(event.target.value as FieldTypes);

  return (
    <Box pt={2}>
      <Box pb={2}>
        <FormControl>
          <InputLabel id="select-label">Type</InputLabel>
          <Select
            value={typeField}
            onChange={changeTypeField}
            size="small"
            label="Type"
            labelId="select-label"
          >
            {fieldTypes.map((fieldType: FieldTypes) => (
              <MenuItem key={fieldType} value={fieldType}>
                {fieldType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {typeField === "text" && <FieldCreator type={typeField} />}
        {typeField === "checkbox" && <FieldCreator type={typeField} />}
        {typeField === "select" && <FieldCreator type={typeField} />}
      </Box>
    </Box>
  );
};
