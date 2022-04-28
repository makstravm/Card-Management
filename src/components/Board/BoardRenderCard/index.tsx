import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { Box, Grid, Paper, Typography } from "@mui/material";

import { Card } from "components/Card";

import { cardsGroupByName } from "constants/cardsGroupByName";

import { getAllCardsAction } from "store/cards/actions";
import { selectGroupCardsList } from "store/cards/selectors";
import { getAllFieldAction } from "store/fields/actions";

import { GroupCardsBtn } from "./GroupCardsBtn";

const { ALL } = cardsGroupByName;

export const BoardRenderCard = () => {
  const dispatch = useDispatch();

  const [group, setGroup] = useState<string>(ALL);

  const groupCardsList = useSelector(selectGroupCardsList(group));

  useEffect(() => {
    dispatch(getAllCardsAction());
    dispatch(getAllFieldAction());
  }, []);

  return (
    <Box>
      <DragDropContext onDragEnd={() => {}}>
        <GroupCardsBtn title={group} handleChangeGroupBy={setGroup} />

        <Grid container spacing={2} pt={2}>
          {groupCardsList?.map(([title, cardsList], i) => (
            <Grid key={`${title + i}`} item xs={3} sx={{ minWidth: "250px" }}>
              <Paper variant="elevation">
                <Typography variant="subtitle1" align="center" color="primary">
                  {title}
                </Typography>
              </Paper>
              <Droppable droppableId={`${title}`}>
                {(provided) => (
                  <Box ref={provided.innerRef} {...provided.droppableProps}>
                    {cardsList?.map((card, i) => (
                      <Card key={`${card.id}`} card={card} idx={i} />
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
              ;
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </Box>
  );
};
