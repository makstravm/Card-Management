import React from "react";

import { Box, CircularProgress } from "@mui/material";

import "./style.scss";

export const Preloader = () => (
  <Box className="preloader">
    <CircularProgress className="preloader__spiner" />;
  </Box>
);
