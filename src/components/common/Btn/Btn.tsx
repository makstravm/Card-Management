import React from "react";

import { Button, Typography } from "@mui/material";

import { BtnPropsType } from "./types";

export const Btn = ({
  title,
  handleClick,
  icon,
  variantBtn,
  disabled = false,
}: BtnPropsType) => (
  <Button
    variant={variantBtn}
    color="primary"
    onClick={() => handleClick()}
    disabled={disabled}
  >
    {icon}
    <Typography pl={icon && 1} variant="button">
      {title}
    </Typography>
  </Button>
);
