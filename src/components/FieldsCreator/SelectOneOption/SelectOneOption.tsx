import React, { ChangeEvent } from "react";
import { Grid, IconButton, TextField } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { OptionPropsType } from "./types";

export const SelectOneOption = ({
  value,
  optionsCount,
  onChange,
  onDelete,
  onMoveDown,
  onMoveUp,
}: OptionPropsType) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.currentTarget.value);

  return (
    <Grid container alignItems="center" pb={2}>
      <Grid item>
        <TextField
          size="small"
          label="Name Option"
          value={value}
          onChange={onChangeHandler}
        />
      </Grid>
      <Grid item>
        <IconButton onClick={() => onMoveUp()} size="small">
          <ArrowCircleUpIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={() => onMoveDown()} size="small">
          <ArrowCircleDownIcon />
        </IconButton>
      </Grid>
      {optionsCount > 2 && (
        <Grid item>
          <IconButton onClick={() => onDelete()} size="small">
            <DeleteForeverIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};
