import React from "react";

import { Button, Typography } from "@mui/material";

import { BtnPropsType } from "./types";

export const Btn = ({
  title,
  handleClick,
  icon: I,
  variantBtn,
  type = "button",
  disabled = false,
}: BtnPropsType) => (
  <Button
    variant={variantBtn}
    color="primary"
    type={type}
    onClick={() => handleClick()}
    disabled={disabled}
  >
    {I}
    <Typography pl={I && 1} variant="button">
      {title}
    </Typography>
  </Button>
);
