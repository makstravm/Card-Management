import React, { useContext, useState } from "react";

import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import { TypesFields } from "constants/typesFields";

import { FieldTypeCreator } from "components/FieldsCreator/FieldTypeCreator";

import { StoreContext } from "store/index";

import { FieldItemPropsType } from "../types";

import "./style.scss";

const { SELECT } = TypesFields;

export const FieldsItem = ({ field }: FieldItemPropsType) => {
  const { id, name, type, required, options } = field;

  const {
    modal: { showModalAction },
    fields: { deleteFieldAction, deleteFieldOptionAction },
  } = useContext(StoreContext);

  const [showOptions, setShowOPtions] = useState<boolean>(false);

  const onDeleteField = () => deleteFieldAction(id, name);

  const onDeleteOption = (idOption: string, value: string) => {
    const newOptions = options?.filter(({ id }) => id !== idOption);

    deleteFieldOptionAction(id, { ...field, options: newOptions }, value, name);
  };

  const onEditField = () =>
    showModalAction(
      "Edit Field",
      <FieldTypeCreator field={field} typeEditField={type} />
    );

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
          <IconButton onClick={onEditField}>
            <ModeEditIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={onDeleteField}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
      {showOptions && (
        <Stack spacing={1} sx={{ marginTop: "-10px" }} mb={2}>
          <Divider />
          {options.map(({ value, id: idOption }) => (
            <Box
              key={idOption}
              pr={2}
              pl={5}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle2">{value}</Typography>
              {options.length > 2 && (
                <IconButton onClick={() => onDeleteOption(idOption, value)}>
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          ))}
        </Stack>
      )}
    </Paper>
  );
};
