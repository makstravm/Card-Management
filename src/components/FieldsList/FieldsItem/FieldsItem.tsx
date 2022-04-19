import React, { useState } from "react";

import {
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { TypesFields } from "constants/typesFields";
import { FieldItemPropsType } from "../types";

import "./style.scss";

const { SELECT } = TypesFields;

export const FieldsItem = ({
  field: { name, type, required, options },
}: FieldItemPropsType) => {
  const [showOptions, setShowOPtions] = useState<boolean>(false);

  return (
    <Paper>
      <Grid
        className="fields-item"
        sx={{
          margin: "0 5px 10px 5px",
          padding: " 0 15px 0 15px",
          width: "100%",
        }}
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid className="fields-item__name" item xs={4}>
          <Typography>{name}</Typography>
          {required && <Typography color="red">*</Typography>}
          {type === SELECT && (
            <IconButton onClick={() => setShowOPtions(!showOptions)}>
              <KeyboardArrowDownIcon />
            </IconButton>
          )}
        </Grid>
        <Grid>
          <Typography align="center"> {type}</Typography>
        </Grid>
        <Grid />
      </Grid>
      {showOptions && (
        <Stack spacing={1} sx={{ marginTop: "-10px" }} mb={2}>
          <Divider />
          {options.map(({ value, id }) => (
            <Typography variant="subtitle2" pl={5} key={id}>
              {value}
            </Typography>
          ))}
        </Stack>
      )}
    </Paper>
  );
};
