import React, { useState } from "react";
import { Box, Divider, SelectChangeEvent } from "@mui/material";

import { SelectInput } from "components/common/SelectInput/SelectInput";
import { v1 } from "uuid";
import { FieldCreator } from "./FieldTextCreator/FieldCreator";

export const fieldTypesOptions = [
  { id: v1(), value: "text" },
  { id: v1(), value: "checkbox" },
  { id: v1(), value: "select" },
];

export const FieldTypeCreator = () => {
  const [typeField, setTypeField] = useState<{ type: string }>({
    type: "text",
  });

  const changeTypeField = (event: SelectChangeEvent) =>
    setTypeField({ type: event.target.value });

  return (
    <Box pt={2}>
      <Box>
        <SelectInput
          value={typeField}
          options={fieldTypesOptions}
          handleChange={changeTypeField}
          name="type"
        />
      </Box>
      <FieldCreator type={typeField.type} />
      <Divider />
    </Box>
  );
};
