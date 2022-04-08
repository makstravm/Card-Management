import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch } from "react-redux";
import { saveFieldAction } from "store/fields/actions";
import { FieldCreatorPropsType } from "./types";
import { SelectOptions } from "../SelectOptions/SelectOptions";

export const FieldCreator = ({ type }: FieldCreatorPropsType) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "select") {
      setOptions(["", ""]);
    }
  }, [type]);

  const [nameField, setNameField] = useState<string>("");

  const [checked, setChecked] = useState<boolean>(false);

  const [options, setOptions] = useState<string[] | []>([]);

  const [error, setError] = useState(false);

  const changeNameField = (e: ChangeEvent<HTMLInputElement>) => {
    setNameField(e.currentTarget.value);
    setError(false);
  };

  const changeChekedRequired = (e: ChangeEvent<HTMLInputElement>) =>
    setChecked(e.currentTarget.checked);

  const onSaveField = () => {
    const validateName = nameField.trim();

    if (validateName) {
      dispatch(
        saveFieldAction({
          name: nameField,
          type,
          required: checked,
          options,
        })
      );
    } else {
      setError(true);
    }
  };

  return (
    <Box pt={2}>
      <Box pb={2}>
        <TextField
          value={nameField}
          onChange={changeNameField}
          size="small"
          label="Name Field"
          error={error}
          helperText={error && "Please fill in the field"}
        />
        {type === "text" && (
          <FormControlLabel
            labelPlacement="start"
            sx={{ paddingLeft: "10px" }}
            label="Required"
            control={
              <Checkbox checked={checked} onChange={changeChekedRequired} />
            }
          />
        )}
      </Box>
      {type === "select" && !!options.length && (
        <SelectOptions
          onSave={onSaveField}
          options={options}
          changeOptions={setOptions}
        />
      )}
      {type !== "select" && (
        <Box>
          <Button variant="outlined" onClick={onSaveField}>
            <SaveIcon fontSize="small" />
            Save
          </Button>
        </Box>
      )}
    </Box>
  );
};
