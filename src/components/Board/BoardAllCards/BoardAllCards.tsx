import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Paper, Typography } from "@mui/material";
import { getAllCardsAction } from "store/cards/actions";
import { selectCardList } from "store/cards/selectors";
import { BoardCardItem } from "./BoardCardItem/BoardCardItem";

export const BoardAllCards = () => {
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
            <BoardCardItem card={card} />
          </Paper>
        </Box>
      ))}
    </Box>
  );
};
