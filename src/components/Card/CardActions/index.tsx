import React, { MouseEvent, useContext, useState } from "react";
import { observer } from "mobx-react-lite";

import { Box, ButtonGroup, Divider, IconButton, Popover } from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";

import { CardCreator } from "components/CardCreator";

import { StoreContext } from "store/index";

import { ConfirmDialog } from "components/common/ConfirmDialog";
import { CardActionsPropsType } from "./types";

export const CardActions = observer(({ card }: CardActionsPropsType) => {
  const {
    modal: { showModalAction },
    cards: { deleteCardAction },
  } = useContext(StoreContext);

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const onDeleteCard = () => {
    setOpenConfirmDialog(true);
    handleClose();
  };

  const onEditCard = () => {
    setAnchorEl(null);
    showModalAction("Edit Card", <CardCreator card={card} />);
  };

  return (
    <Box data-testid="card-actions--box">
      <IconButton onClick={handleClick} data-testid="button-more">
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
          <IconButton onClick={onEditCard} data-testid="button-edit">
            <EditIcon fontSize="small" />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton onClick={onDeleteCard} data-testid="button-delete">
            <DeleteForeverRoundedIcon fontSize="small" />
          </IconButton>
        </ButtonGroup>
      </Popover>
      <ConfirmDialog
        open={openConfirmDialog}
        setOpen={setOpenConfirmDialog}
        handleClick={() => deleteCardAction(card.id)}
        title="Do you really want to remove the card?"
      />
    </Box>
  );
});
