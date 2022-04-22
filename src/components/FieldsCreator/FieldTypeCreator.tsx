import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, SelectChangeEvent } from "@mui/material";

import { initialField } from "constants/field/initialField";
import { SelectInput } from "components/common/SelectInput/SelectInput";

import { getAllFieldAction, getFieldTypesAction } from "store/fields/actions";
import { selectFieldTypes } from "store/fields/selectors";
import { FieldCreator } from "./FieldTextCreator/FieldCreator";

import { FieldTypeCreatorPropsType } from "./types";

export const FieldTypeCreator = ({
  typeEditField = "",
  field = initialField,
}: FieldTypeCreatorPropsType) => {
  const dispatch = useDispatch();

  const fieldTypesOptions = useSelector(selectFieldTypes);

  const [typeField, setTypeField] = useState<{ type: string }>({
    type: typeEditField,
  });

  useEffect(() => {
    dispatch(getFieldTypesAction());
    dispatch(getAllFieldAction());
  }, []);

  useEffect(() => {
    if (!typeEditField) {
      setTypeField({ type: fieldTypesOptions?.[0]?.value });
    }
  }, [fieldTypesOptions]);

  const changeTypeField = (event: SelectChangeEvent) =>
    setTypeField({ type: event.target.value });

  return (
    <Box pt={2}>
      {!!fieldTypesOptions.length && (
        <>
          <Box>
            <SelectInput
              value={{ type: typeField?.type || fieldTypesOptions?.[0]?.value }}
              options={fieldTypesOptions}
              handleChange={changeTypeField}
              name="type"
            />
          </Box>
          <FieldCreator type={typeField.type} field={field} />
        </>
      )}
    </Box>
  );
};
