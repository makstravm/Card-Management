import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import { ConfirmDialogType } from "./type";

export const ConfirmDialog = ({
  open,
  setOpen,
  title,
  handleClick,
}: ConfirmDialogType) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handlAgree = () => {
    handleClick();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handlAgree}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};
