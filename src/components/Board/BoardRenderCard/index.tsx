import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { observer } from "mobx-react-lite";

import { Box, Grid, Paper, Typography } from "@mui/material";

import { Card } from "components/Card";

import { cardsGroupByName } from "constants/cardsGroupByName";

import { getAllCardsAction, moveEditCardAction } from "store/cards/actions";
import { selectGroupCardsList } from "store/cards/selectors";
import { StoreContext } from "store/index";

import { GroupCardsBtn } from "./GroupCardsBtn";

const { ALL } = cardsGroupByName;

export const BoardRenderCard = observer(() => {
  const {
    fields: { getAllFieldAction },
  } = useContext(StoreContext);

  const dispatch = useDispatch();

  const [group, setGroup] = useState<string>(ALL);

  const groupCardsList = useSelector(selectGroupCardsList(group));

  useEffect(() => {
    dispatch(getAllCardsAction());
    getAllFieldAction();
  }, []);

  const onDragEndHandler = ({
    destination,
    source,
    draggableId,
  }: DropResult) => {
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId) {
      return;
    }
    dispatch(moveEditCardAction(+draggableId, group, destination.droppableId));
  };

  return (
    <Box>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <GroupCardsBtn title={group} handleChangeGroupBy={setGroup} />
        <Grid container spacing={2} pt={2}>
          {groupCardsList?.map(([title, cardsList], i) => (
            <Droppable droppableId={`${title}`} key={`${title + i}`}>
              {(provided, snapshot) => (
                <Grid item xs={3} sx={{ minWidth: "250px" }}>
                  <Paper variant="elevation">
                    <Typography
                      sx={{
                        backgroundColor: snapshot.isDraggingOver && "#1976d2",
                        borderRadius: "4px",
                        color: !snapshot.isDraggingOver ? "#1976d2" : "#ffffff",
                        transition: "all .3s",
                      }}
                      variant="subtitle1"
                      align="center"
                    >
                      {title}
                    </Typography>
                  </Paper>
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{ minHeight: "150px" }}
                  >
                    {cardsList?.map((card, i) => (
                      <Card key={`${card.id}`} card={card} idx={i} />
                    ))}
                    {provided.placeholder}
                  </Box>
                </Grid>
              )}
            </Droppable>
          ))}
        </Grid>
      </DragDropContext>
    </Box>
  );
});
