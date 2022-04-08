import React from "react";

import { Box, Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch } from "react-redux";
import { showModal } from "store/modals/actions";
import { FieldsCreator } from "components/FieldsCreator/CarFieldsCreator";

export const BoardControlPanel = () => {
  const dispatch = useDispatch();

  return (
    <Box pb={2} pt={3} textAlign="left">
      <Button
        variant="outlined"
        color="primary"
        onClick={() => dispatch(showModal("Create Field", <FieldsCreator />))}
      >
        <AddCircleIcon fontSize="small" />
        <Typography variant="button">Add Field</Typography>
      </Button>
    </Box>
  );
};
