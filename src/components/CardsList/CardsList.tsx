import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Checkbox, Grid, Paper, Typography } from "@mui/material";
import { getAllCardsAction } from "store/cards/actions";
import { selectCardList } from "store/cards/selectors";

import "./style.scss";

export const CardsList = () => {
  const dispatch = useDispatch();

  const cardsList = useSelector(selectCardList);

  useEffect(() => {
    dispatch(getAllCardsAction());
  }, []);

  return (
    <Box>
      <Box pb={3}>
        <Paper variant="elevation">
          <Typography variant="subtitle1" align="center" color="primary">
            All Card
          </Typography>
        </Paper>
      </Box>
      {cardsList?.map((card) => (
        <Box key={`${card.id}`} sx={{ maxWidth: 275 }} pb={2}>
          <Paper elevation={3}>
            <Box p={2} className="card-item">
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
                      {value}
                    </Typography>
                  ) : (
                    <Checkbox checked={value} disableRipple size="small" />
                  )}
                </Grid>
              ))}
            </Box>
          </Paper>
        </Box>
      ))}
    </Box>
  );
};
