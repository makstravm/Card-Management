import React from "react";

import { Box, Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch } from "react-redux";
import { showModal } from "store/modals/actions";

export const BoardControlPanel = () => {
  const dispatch = useDispatch();

  return (
    <Box pb={2} pt={3} textAlign="center">
      <Button
        variant="outlined"
        color="primary"
        onClick={() => dispatch(showModal("test", <div />))}
      >
        <AddCircleIcon fontSize="small" />
        <Typography variant="button">Add Task</Typography>
      </Button>
    </Box>
  );
};
