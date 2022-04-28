import React from "react";
import { Draggable } from "react-beautiful-dnd";

import { Box, Checkbox, Grid, Paper, Typography } from "@mui/material";

import { CardActions } from "./CardActions";

import { CardPropsType } from "./types";

import "./style.scss";

export const Card = ({ card, idx }: CardPropsType) => (
  <Draggable draggableId={`${card.id}`} index={idx}>
    {(provided) => (
      <Box
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        sx={{ maxWidth: 275 }}
        pt={2}
      >
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
                    {key !== "id" ? value : idx + 1}
                  </Typography>
                ) : (
                  <Checkbox checked={value} disableRipple size="small" />
                )}
              </Grid>
            ))}
            <Box className="card-item__actions">
              <CardActions card={card} />
            </Box>
          </Box>
        </Paper>
      </Box>
    )}
  </Draggable>
);
