import React from "react";

import { Box, Checkbox, Grid, Typography } from "@mui/material";
import { BoardCardItemPropsType } from "./types";

import "./style.scss";

export const BoardCardItem = ({ card }: BoardCardItemPropsType) => (
  <Box p={2} className="CardItem">
    {Object.entries(card).map(([key, value]) => (
      <Grid
        key={`${card.id}-${key}`}
        className={key === "id" ? "CardItem__number" : ""}
        container
        alignItems="center"
      >
        {key !== "id" && (
          <Typography className="CardItem__key">{key}</Typography>
        )}

        {typeof value !== "boolean" ? (
          <Typography className="CardItem__value">{value}</Typography>
        ) : (
          <Checkbox checked={value} disableRipple size="small" />
        )}
      </Grid>
    ))}
  </Box>
);
