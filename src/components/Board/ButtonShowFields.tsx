import React from "react";
import { useDispatch } from "react-redux";

import { Button, Typography } from "@mui/material";

import ListIcon from "@mui/icons-material/List";

export const ButtonShowFields = () => {
  const dispatch = useDispatch();

  return (
    <Button
      variant="text"
      size="small"
      color="primary"
      // onClick={() => dispatch(showModal("All Fields", ))}
    >
      <ListIcon fontSize="small" />
      <Typography pl={1} variant="caption">
        Show all fields
      </Typography>
    </Button>
  );
};
