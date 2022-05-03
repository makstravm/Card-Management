import React from "react";
import { observer } from "mobx-react-lite";

import { Box, Grid } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListIcon from "@mui/icons-material/List";

import { FieldTypeCreator } from "components/FieldsCreator/FieldTypeCreator";
import { CardCreator } from "components/CardCreator";
import { Btn } from "components/common/Btn/Btn";
import { FieldsList } from "components/FieldsList";

import modal from "store/modals";

const { showModalAction } = modal;

export const BoardControlPanel = observer(() => (
  <Grid container>
    <Grid>
      <Box pb={1} pt={3}>
        <Btn
          title="Add Field"
          variantBtn="outlined"
          handleClick={() =>
            showModalAction("Create Field", <FieldTypeCreator />)
          }
          icon={<AddCircleIcon fontSize="small" />}
        />
      </Box>
      <Box pb={1}>
        <Btn
          variantBtn="text"
          title="Show all fields"
          handleClick={() => showModalAction("All Fields", <FieldsList />)}
          icon={<ListIcon fontSize="small" />}
        />
      </Box>
    </Grid>
    <Box pb={1} pt={3}>
      <Btn
        variantBtn="outlined"
        title="Create Card"
        handleClick={() => showModalAction("Create Card", <CardCreator />)}
        icon={<AddCircleIcon fontSize="small" />}
      />
    </Box>
  </Grid>
));
