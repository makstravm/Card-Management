import React from "react";
import { useDispatch } from "react-redux";

import { Box, Button, Grid, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { showModal } from "store/modals/actions";
import { FieldTypeCreator } from "components/FieldsCreator/FieldTypeCreator";
import { CardCreator } from "components/CardCreator/CardCreator";
import { ButtonShowFields } from "../ButtonShowFields";

export const BoardControlPanel = () => {
  const dispatch = useDispatch();

  return (
    <Grid container>
      <Grid>
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
      </Grid>
      <Box pb={1} pt={3}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => dispatch(showModal("Create Field", <CardCreator />))}
        >
          <AddCircleIcon fontSize="small" />
          <Typography pl={1} variant="button">
            Create Card
          </Typography>
        </Button>
      </Box>
    </Grid>
  );
};
