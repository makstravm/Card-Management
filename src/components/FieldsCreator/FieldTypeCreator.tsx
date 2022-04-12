import React, { useState } from "react";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { FieldTypes } from "store/fields/types";
import { ButtonShowFields } from "components/Board/ButtonShowFields";
import { FieldCreator } from "./FieldTextCreator/FieldCreator";

export const fieldTypes = ["text", "checkbox", "select"];

export const FieldTypeCreator = () => {
  const [typeField, setTypeField] = useState<FieldTypes>("text");

  const changeTypeField = (event: SelectChangeEvent) =>
    setTypeField(event.target.value as FieldTypes);

  return (
    <Box pt={2}>
      <Box>
        <FormControl
          sx={{
            maxWidth: "225px",
            width: "100%",
          }}
        >
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
      </Box>
      <FieldCreator type={typeField} />
      <Divider />
      <Box textAlign="center" pt={2}>
        <ButtonShowFields />
      </Box>
    </Box>
  );
};
