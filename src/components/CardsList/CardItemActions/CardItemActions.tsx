import React from "react";

import { IconButton } from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { useDispatch } from "react-redux";
import { deleteCardAction } from "store/cards/actions";
import { CardItemActionsPropsType } from "./types";

export const CardItemActions = ({ id }: CardItemActionsPropsType) => {
  const dispatch = useDispatch();

  const onDeleteCard = () => dispatch(deleteCardAction(id));

  return (
    <IconButton onClick={onDeleteCard}>
      <DeleteForeverRoundedIcon fontSize="small" />
    </IconButton>
  );
};
