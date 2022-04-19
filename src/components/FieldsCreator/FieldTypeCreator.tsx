import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Divider, SelectChangeEvent } from "@mui/material";

import { SelectInput } from "components/common/SelectInput/SelectInput";

import { getFieldTypesAction } from "store/fields/actions";
import { selectFieldTypes } from "store/fields/selectors";
import { FieldCreator } from "./FieldTextCreator/FieldCreator";

export const FieldTypeCreator = () => {
  const dispatch = useDispatch();

  const fieldTypesOptions = useSelector(selectFieldTypes);

  const [typeField, setTypeField] = useState<{ type: string }>({
    type: "",
  });

  useEffect(() => {
    dispatch(getFieldTypesAction());
  }, []);

  const changeTypeField = (event: SelectChangeEvent) =>
    setTypeField({ type: event.target.value });

  return (
    <Box pt={2}>
      <Box>
        {fieldTypesOptions && (
          <SelectInput
            value={typeField}
            options={fieldTypesOptions}
            handleChange={changeTypeField}
            name="type"
          />
        )}
      </Box>
      <FieldCreator type={typeField.type} />
      <Divider />
    </Box>
  );
};
