import React from "react";

import { Box, Checkbox, Grid, Paper, Typography } from "@mui/material";

import { CardItemActions } from "./CardItemActions/CardItemActions";

import { CardsListPropsType } from "./types";

import "./style.scss";

export const CardsList = ({ cardsList }: CardsListPropsType) => (
  <Box>
    {cardsList?.map((card, i) => (
      <Box key={`${card.id}`} sx={{ maxWidth: 275 }} pt={2}>
        <Paper elevation={3}>
          <Box p={2} pr={3.5} className="card-item">
            {Object.entries(card).map(([key, value]) => (
              <Grid
                key={`${card.id}-${key}`}
                className={key === "id" ? "card-item__number" : ""}
                container
                alignItems="center"
              >
                {key !== "id" && (
                  <Typography className="card-item__key">{key}</Typography>
                )}

                {typeof value !== "boolean" ? (
                  <Typography className="card-item__value">
                    {key !== "id" ? value : i + 1}
                  </Typography>
                ) : (
                  <Checkbox checked={value} disableRipple size="small" />
                )}
              </Grid>
            ))}
            <Box className="card-item__actions">
              <CardItemActions card={card} />
            </Box>
          </Box>
        </Paper>
      </Box>
    ))}
  </Box>
);
