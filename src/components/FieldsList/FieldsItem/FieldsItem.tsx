import React, { useState } from "react";

import {
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch } from "react-redux";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { TypesFields } from "constants/typesFields";
import { deleteFieldAction } from "store/fields/actions";

import { FieldItemPropsType } from "../types";

import "./style.scss";

const { SELECT } = TypesFields;

export const FieldsItem = ({
  field: { id, name, type, required, options },
}: FieldItemPropsType) => {
  const dispatch = useDispatch();

  const [showOptions, setShowOPtions] = useState<boolean>(false);

  const onDeleteField = () => dispatch(deleteFieldAction(id));

  return (
    <Paper>
      <Grid
        className="fields-item"
        sx={{
          margin: "0 5px 10px 5px",
          padding: " 0 15px 0 15px",
          width: "100%",
        }}
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid className="fields-item__name" item xs={4}>
          <Typography>{name}</Typography>
          {required && <Typography color="red">*</Typography>}
          {type === SELECT && (
            <IconButton onClick={() => setShowOPtions(!showOptions)}>
              <KeyboardArrowDownIcon />
            </IconButton>
          )}
        </Grid>
        <Grid>
          <Typography align="center"> {type}</Typography>
        </Grid>
        <Grid>
          <IconButton onClick={onDeleteField}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
      {showOptions && (
        <Stack spacing={1} sx={{ marginTop: "-10px" }} mb={2}>
          <Divider />
          {options.map(({ value, id: idOption }) => (
            <Typography key={idOption} variant="subtitle2" pl={5}>
              {value}
            </Typography>
          ))}
        </Stack>
      )}
    </Paper>
  );
};
