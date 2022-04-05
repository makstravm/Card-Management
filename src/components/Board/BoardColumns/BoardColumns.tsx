import React from "react";

import { Grid, Paper, Typography } from "@mui/material";
import { BoardColumnsPropsType } from "./types";

export const BoardColumns = ({ boardsColumns }: BoardColumnsPropsType) => (
  <Grid container spacing={2} justifyContent="space-between">
    {boardsColumns.map(({ id, title }) => (
      <Grid key={id} item xs={4}>
        <Paper variant="elevation">
          <Typography variant="subtitle1" align="center" color="primary">
            {title}
          </Typography>
        </Paper>
      </Grid>
    ))}
  </Grid>
);
