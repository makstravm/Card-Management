import React from "react";
import { useDispatch } from "react-redux";

import { Button, Typography } from "@mui/material";

import ListIcon from "@mui/icons-material/List";
import { showModal } from "store/modals/actions";
import { FieldsList } from "components/FieldsList/FieldsList";

export const ButtonShowFields = () => {
  const dispatch = useDispatch();

  return (
    <Button
      variant="text"
      size="small"
      color="primary"
      onClick={() => dispatch(showModal("All Fields", <FieldsList />))}
    >
      <ListIcon fontSize="small" />
      <Typography pl={1} variant="caption">
        Show all fields
      </Typography>
    </Button>
  );
};
