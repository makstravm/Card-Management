import React from "react";

import { Box, Checkbox, Grid, Typography } from "@mui/material";
import { CardItemPropsType } from "./types";

import "./style.scss";

export const CardItem = ({ card }:CardItemPropsType) => (
  <Box p={2} className="card-item">
    {Object.entries(card).map(([key, value]) => (
      <Grid
        key={`${card.id}-${key}`}
        className={key === "id" ? "cardItem__number" : ""}
        container
        alignItems="center"
      >
        {key !== "id" && (
          <Typography className="card-item__key">{key}</Typography>
        )}

        {typeof value !== "boolean" ? (
          <Typography className="card-item__value">{value}</Typography>
        ) : (
          <Checkbox checked={value} disableRipple size="small" />
        )}
      </Grid>
    ))}
  </Box>
);
