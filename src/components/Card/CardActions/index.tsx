import React, { MouseEvent, useContext, useState } from "react";
import { observer } from "mobx-react-lite";

import { Box, ButtonGroup, Divider, IconButton, Popover } from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";

import { CardCreator } from "components/CardCreator";

import { StoreContext } from "store/index";

import { CardActionsPropsType } from "./types";

export const CardActions = observer(({ card }: CardActionsPropsType) => {
  const {
    modal: { showModalAction },
    cards: { deleteCardAction },
  } = useContext(StoreContext);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDeleteCard = () => deleteCardAction(card.id);

  const onEditCard = () => {
    setAnchorEl(null);
    showModalAction("Edit Card", <CardCreator card={card} />);
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <ButtonGroup aria-label="small button group">
          <IconButton onClick={onEditCard}>
            <EditIcon fontSize="small" />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton onClick={onDeleteCard}>
            <DeleteForeverRoundedIcon fontSize="small" />
          </IconButton>
        </ButtonGroup>
      </Popover>
    </Box>
  );
});
