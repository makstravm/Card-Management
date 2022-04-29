import React from "react";

import { Box, CircularProgress } from "@mui/material";

import "./style.scss";
import { useSelector } from "react-redux";

export const Preloader = () => {
  const allStore = useSelector((state) => state);

  const isLoading = Object.values(allStore).some((store) => store.loading);

  if (isLoading) {
    return (
      <Box className="preloader">
        <CircularProgress className="preloader__spiner" />;
      </Box>
    );
  }

  return null;
};
