import React from "react";

import { Box, Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch } from "react-redux";
import { showModal } from "store/modals/actions";
import { FieldTypeCreator } from "components/FieldsCreator/FieldTypeCreator";
import { ButtonShowFields } from "../ButtonShowFields";

export const BoardControlPanel = () => {
  const dispatch = useDispatch();

  return (
    <Box textAlign="left">
      <Box pb={1} pt={3}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() =>
            dispatch(showModal("Create Field", <FieldTypeCreator />))
          }
        >
          <AddCircleIcon fontSize="small" />
          <Typography pl={1} variant="button">
            Add Field
          </Typography>
        </Button>
      </Box>
      <Box pb={1}>
        <ButtonShowFields />
      </Box>
    </Box>
  );
};
