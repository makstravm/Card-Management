import React, { useContext, useState } from "react";

import {
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

import { OptionOfField } from "components/FieldsList/OptionOfField";
import { FieldTypeCreator } from "components/FieldsCreator/FieldTypeCreator";
import { ConfirmDialog } from "components/common/ConfirmDialog";

import { StoreContext } from "store/index";

import { FieldItemPropsType } from "../types";

import "./style.scss";

const { SELECT } = TypesFields;

export const FieldsItem = ({ field, index }: FieldItemPropsType) => {
  const { id, name, type, required, options } = field;

  const {
    modal: { showModalAction },
    fields: { deleteFieldAction },
  } = useContext(StoreContext);

  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);

  const [showOptions, setShowOPtions] = useState<boolean>(false);

  const onDeleteField = () => deleteFieldAction(id, name);

  const renderBtnDelete = index < 3;

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
          <IconButton
            onClick={onEditField}
            sx={{ marginRight: renderBtnDelete ? "36px" : "0" }}
          >
            <ModeEditIcon fontSize="small" />
          </IconButton>
          {!renderBtnDelete && (
            <IconButton onClick={() => setOpenConfirmDialog(true)}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          )}
        </Grid>
      </Grid>
      {showOptions && (
        <Stack spacing={1} sx={{ marginTop: "-10px" }} mb={2}>
          <Divider />
          {options.map(({ value, id: idOption }) => (
            <OptionOfField
              key={idOption}
              idOption={idOption}
              value={value}
              field={field}
            />
          ))}
        </Stack>
      )}
      <ConfirmDialog
        open={openConfirmDialog}
        setOpen={setOpenConfirmDialog}
        handleClick={onDeleteField}
        title={`Do you really want remove field - ${name}`}
      />
    </Paper>
  );
};
