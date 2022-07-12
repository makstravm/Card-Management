import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Box, CircularProgress } from "@mui/material";

import { StoreContext } from "store/index";

import "./style.scss";

export const Preloader = observer(() => {
  const root = useContext(StoreContext);

  const isLoading = Object.values(root).some((store) => store.loading);

  if (isLoading) {
    return (
      <Box className="preloader" data-testid="preloader">
        <CircularProgress className="preloader__spiner" />
      </Box>
    );
  }

  return null;
});
