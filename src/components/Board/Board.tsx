import React from "react";

import { Container, Grid, Paper, Typography } from "@mui/material";

import { BoardType } from "./types";
import { BoardHeader } from "./BoardHeader/BoardHeader";

export const Board = ({ boardsColumns }: BoardType) => (
  <Container maxWidth="lg">
    <BoardHeader />
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
  </Container>
);
