import React, { useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { observer } from "mobx-react-lite";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";

import { StoreContext } from "store/index";

import "./style.scss";

const modalRoot = document.createElement("div");

modalRoot.setAttribute("id", "modal-root");
document.body.appendChild(modalRoot);

export const Modal = observer(() => {
  const el = document.createElement("div");

  const { showModal, title, component, hideModalAction } =
    useContext(StoreContext).modal;

  useEffect(() => {
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  });

  return createPortal(
    <CSSTransition in={showModal} mountOnEnter unmountOnExit timeout={300}>
      <Box className={`modal ${showModal && "show"}`} onClick={hideModalAction}>
        <Paper
          className="modal__content"
          onClick={(e) => e.stopPropagation()}
          elevation={3}
        >
          <Box className="modal__header">
            <Typography variant="h5">{title}</Typography>
            <IconButton className="modal__close-btn" onClick={hideModalAction}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box className="modal__body">{component}</Box>
        </Paper>
      </Box>
    </CSSTransition>,
    el
  );
});
