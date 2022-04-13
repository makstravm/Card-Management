import React from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";

import { hideModal } from "store/modals/actions";
import { selectModalChange } from "store/modals/selectors";

import "./style.scss";

export const Modal = () => {
  const { showModal, title, component } = useSelector(selectModalChange);

  const dispatch = useDispatch();

  const closeModal = () => dispatch(hideModal());

  return createPortal(
    <CSSTransition in={showModal} mountOnEnter unmountOnExit timeout={300}>
      <Box className={`Modal ${showModal && "show"}`} onClick={closeModal}>
        <Paper
          className="Modal__content"
          onClick={(e) => e.stopPropagation()}
          elevation={3}
        >
          <Box className="Modal__header">
            <Typography variant="h5">{title}</Typography>
            <IconButton className="Modal__close-btn" onClick={closeModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box className="Modal__body">{component}</Box>
        </Paper>
      </Box>
    </CSSTransition>,
    document.getElementById("root")
  );
};
