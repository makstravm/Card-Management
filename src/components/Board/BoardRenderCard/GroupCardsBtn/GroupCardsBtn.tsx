import React, { MouseEvent, useState } from "react";
import { useSelector } from "react-redux";

import { Box, Button, Divider, Popover, Stack } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { Btn } from "components/common/Btn/Btn";

import { selectGroupOptions } from "store/fields/selectors";

import { GroupCardsBtnPropsType } from "./types";

export const GroupCardsBtn = ({
  title,
  handleChangeGroupBy,
}: GroupCardsBtnPropsType) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const groupOptions = useSelector(selectGroupOptions);

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box textAlign="right">
      <Button aria-describedby="id" variant="text" onClick={handlePopoverOpen}>
        {title}
        <KeyboardArrowDownIcon fontSize="small" />
      </Button>
      <Popover
        id="id"
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Stack divider={<Divider flexItem />}>
          {!!groupOptions.length &&
            groupOptions.map(({ id, value }) => (
              <Btn
                key={id}
                variantBtn="text"
                title={value}
                handleClick={() => handleChangeGroupBy(value)}
              />
            ))}
        </Stack>
      </Popover>
    </Box>
  );
};
