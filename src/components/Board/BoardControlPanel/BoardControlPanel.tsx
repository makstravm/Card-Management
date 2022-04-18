import React from "react";
import { useDispatch } from "react-redux";

import { Box, Grid } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListIcon from "@mui/icons-material/List";

import { showModal } from "store/modals/actions";

import { FieldTypeCreator } from "components/FieldsCreator/FieldTypeCreator";
import { CardCreator } from "components/CardCreator/CardCreator";
import { Btn } from "components/common/Btn/Btn";
import { FieldsList } from "components/FieldsList/FieldsList";

export const BoardControlPanel = () => {
  const dispatch = useDispatch();

  return (
    <Grid container>
      <Grid>
        <Box pb={1} pt={3}>
          <Btn
            title="Add Field"
            variantBtn="outlined"
            handleClick={() =>
              dispatch(showModal("Create Field", <FieldTypeCreator />))
            }
            icon={<AddCircleIcon fontSize="small" />}
          />
        </Box>
        <Box pb={1}>
          <Btn
            variantBtn="text"
            title="Show all fields"
            handleClick={() =>
              dispatch(showModal("All Fields", <FieldsList />))
            }
            icon={<ListIcon fontSize="small" />}
          />
        </Box>
      </Grid>
      <Box pb={1} pt={3}>
        <Btn
          variantBtn="outlined"
          title="Create Card"
          handleClick={() =>
            dispatch(showModal("Create Card", <CardCreator />))
          }
          icon={<AddCircleIcon fontSize="small" />}
        />
      </Box>
    </Grid>
  );
};
