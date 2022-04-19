import React, { useState } from "react";
import { Box, Divider, SelectChangeEvent } from "@mui/material";

import { SelectInput } from "components/common/SelectInput/SelectInput";
import { fieldTypesOptions } from "constants/fieldTypesOptions/fieldTypesOptions";
import { FieldCreator } from "./FieldTextCreator/FieldCreator";

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
