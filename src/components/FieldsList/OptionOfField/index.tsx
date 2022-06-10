import React, { useContext, useState } from "react";

import { Box, IconButton, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { ConfirmDialog } from "components/common/ConfirmDialog";

import { StoreContext } from "store/index";

import { OptionOfFieldType } from "./type";

export const OptionOfField = ({
  idOption,
  value,
  field,
}: OptionOfFieldType) => {
  const {
    fields: { deleteFieldOptionAction },
  } = useContext(StoreContext);

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const onDeleteOption = (idOption: string, value: string) => {
    const newOptions = field.options?.filter(({ id }) => id !== idOption);

    deleteFieldOptionAction(
      field.id,
      { ...field, options: newOptions },
      value,
      field.name
    );
  };

  return (
    <Box
      pr={2}
      pl={5}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="subtitle2">{value}</Typography>
      {field.options.length > 2 && (
        <IconButton onClick={() => setOpenConfirmDialog(true)}>
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      )}
      <ConfirmDialog
        open={openConfirmDialog}
        setOpen={setOpenConfirmDialog}
        handleClick={() => onDeleteOption(idOption, value)}
        title={`Do you really want remove option - ${value}`}
      />
    </Box>
  );
};
