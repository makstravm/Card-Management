import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { Box, SelectChangeEvent } from "@mui/material";
import { SelectInput } from "components/common/SelectInput/SelectInput";

import { initialField } from "constants/field/initialField";

import { StoreContext } from "store/index";

import { FieldTypeCreatorPropsType } from "./types";
import { FieldCreator } from "./FieldTextCreator";

export const FieldTypeCreator = observer(
  ({ typeEditField = "", field = initialField }: FieldTypeCreatorPropsType) => {
    const [typeField, setTypeField] = useState<{ type: string }>({
      type: typeEditField,
    });

    const { fieldTypes: fieldTypesOptions, getFieldTypesAction } =
      useContext(StoreContext).fields;

    useEffect(() => {
      getFieldTypesAction();
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
            {!field.id && (
              <Box>
                <SelectInput
                  value={{
                    type: typeField?.type || fieldTypesOptions?.[0]?.value,
                  }}
                  options={fieldTypesOptions}
                  handleChange={changeTypeField}
                  name="type"
                />
              </Box>
            )}
            <FieldCreator type={typeField.type} field={field} />
          </>
        )}
      </Box>
    );
  }
);
