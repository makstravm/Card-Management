import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { v1 } from "uuid";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { SelectOptionsPropsType } from "./types";
import { SelectOneOption } from "../SelectOneOption/SelectOneOption";

export const SelectOptions = ({
  onSave,
  options,
  changeOptions,
}: SelectOptionsPropsType) => {
  const [optionsId, setOptionsId] = useState<string[]>(options.map(() => v1()));

  useEffect(() => {}, [options]);

  const onChange = (value: string, id: string) =>
    changeOptions(
      options.map((option, i) => (optionsId[i] === id ? value : option))
    );

  const onDelete = (id: string) => {
    changeOptions(
      [...options].filter((option, i) => optionsId[i] !== id && option)
    );
    setOptionsId(
      [...optionsId].filter((optionId, i) => optionsId[i] !== id && optionId)
    );
  };

  const onMoveUp = (i: number) => {
    const newOptions = [...options];

    const newOptionsId = [...optionsId];

    if (i !== 0) {
      newOptions.splice(i - 1, 2, options[i], options[i - 1]);
      newOptionsId.splice(i - 1, 2, optionsId[i], optionsId[i - 1]);
      changeOptions(newOptions);
      setOptionsId(newOptionsId);
    }
  };

  const onMoveDown = (i: number) => {
    const newOptions = [...options];

    const newOptionsId = [...optionsId];

    if (i !== newOptions.length - 1) {
      newOptions.splice(i, 2, options[i + 1], options[i]);
      newOptionsId.splice(i, 2, optionsId[i + 1], optionsId[i]);
      changeOptions(newOptions);
      setOptionsId(newOptionsId);
    }
  };

  const onSaveField = () => onSave(options);

  return (
    <Box>
      <Divider textAlign="left">
        <Typography variant="subtitle2">Options</Typography>
      </Divider>
      <Box pt={2}>
        {options?.map((option: string, i: number) => (
          <SelectOneOption
            key={optionsId[i] || i}
            value={option}
            onChange={(value: string) => onChange(value, optionsId[i])}
            onMoveUp={() => onMoveUp(i)}
            onMoveDown={() => onMoveDown(i)}
            onDelete={() => onDelete(optionsId[i])}
          />
        ))}
      </Box>
      <Box>
        <Button variant="text" onClick={onSaveField}>
          <AddIcon fontSize="small" />
          Add
        </Button>
      </Box>
      <Divider />
      <Box>
        <Button variant="outlined" onClick={onSaveField}>
          <SaveIcon fontSize="small" />
          Save
        </Button>
      </Box>
    </Box>
  );
};
