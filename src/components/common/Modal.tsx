import React from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";

import { ModalPropsType } from "./types";

import "./style.scss";

export const Modal = ({ title, show, close, children }: ModalPropsType) =>
  createPortal(
    <CSSTransition in={show} unmountOnExit timeout={300}>
      <Box
        className={`Modal ${show ? "show" : ""}`}
        onClick={() => close(false)}
      >
        <Paper
          className="Modal__content"
          onClick={(e) => e.stopPropagation()}
          elevation={3}
        >
          <Box className="Modal__header">
            <Typography variant="h5">{title}</Typography>
            <IconButton
              className="Modal__close-btn"
              onClick={() => close(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box className="Modal__body">{children}</Box>
          <div className="Modal__footer" />
        </Paper>
      </Box>
    </CSSTransition>,
    document.getElementById("root")
  );
