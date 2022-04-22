import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Paper, Typography } from "@mui/material";

import { getAllCardsAction } from "store/cards/actions";
import { selectGroupCardsList } from "store/cards/selectors";

import { CardsList } from "components/CardsList/CardsList";

export const BoardRenderCard = () => {
  const dispatch = useDispatch();

  const groupCardsList = useSelector(selectGroupCardsList("Car"));

  useEffect(() => {
    dispatch(getAllCardsAction());
  }, []);

  return (
    <Grid container spacing={2}>
      {Object.entries(groupCardsList).map(([title, cardsList]) => (
        <Grid item xs={3} sx={{ minWidth: "250px" }}>
          <Paper variant="elevation">
            <Typography variant="subtitle1" align="center" color="primary">
              {title}
            </Typography>
          </Paper>
          <CardsList cardsList={cardsList} />;
        </Grid>
      ))}
    </Grid>
  );
};
