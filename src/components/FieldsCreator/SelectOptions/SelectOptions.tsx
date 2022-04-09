import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import { v1 } from "uuid";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { OptionsType } from "store/fields/types";
import { SelectOptionsPropsType } from "./types";
import { SelectOneOption } from "../SelectOneOption/SelectOneOption";

const optionsItems: OptionsType[] = [
  { id: v1(), value: "" },
  { id: v1(), value: "" },
];

export const SelectOptions = ({ onSave }: SelectOptionsPropsType) => {
  const [options, setOptions] = useState<OptionsType[]>(optionsItems);

  const onChange = (value: string, id: string) =>
    setOptions(
      options.map((option: OptionsType) =>
        option.id === id ? { ...option, value } : option
      )
    );

  const addOption = () => {
    setOptions([...options, { id: v1(), value: "" }]);
  };

  const onDelete = (id: string) => {
    setOptions([...options].filter((option) => option.id !== id && option));
  };

  const onMoveUp = (i: number) => {
    const newOptions = [...options];

    if (i !== 0) {
      newOptions.splice(i - 1, 2, options[i], options[i - 1]);
      setOptions(newOptions);
    }
  };

  const onMoveDown = (i: number) => {
    const newOptions = [...options];

    if (i !== newOptions.length - 1) {
      newOptions.splice(i, 2, options[i + 1], options[i]);
      setOptions(newOptions);
    }
  };

  const onSaveField = () => onSave(options);

  return (
    <Box>
      <Divider textAlign="left">
        <Typography variant="subtitle2">Options</Typography>
      </Divider>
      <Box pt={2}>
        {options?.map(({ id, value }, i) => (
          <SelectOneOption
            key={id}
            value={value}
            optionsCount={options?.length}
            onChange={(newValue: string) => onChange(newValue, id)}
            onMoveUp={() => onMoveUp(i)}
            onMoveDown={() => onMoveDown(i)}
            onDelete={() => onDelete(id)}
          />
        ))}
      </Box>
      <Box pb={2} textAlign="center">
        <Button variant="text" onClick={addOption}>
          <AddIcon fontSize="small" />
          Add
        </Button>
      </Box>
      <Divider />
      <Box textAlign="center" pt={2}>
        <Button variant="outlined" onClick={onSaveField}>
          <SaveIcon fontSize="small" />
          Save
        </Button>
      </Box>
    </Box>
  );
};
