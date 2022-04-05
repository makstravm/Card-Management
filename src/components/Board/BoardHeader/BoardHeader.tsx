import React from "react";

import { Box, Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const BoardHeader = () => (
  <Box pb={2} pt={3} textAlign="center">
    <Button variant="outlined" color="primary">
      <AddCircleIcon fontSize="small" />
      <Typography variant="button">Add Task</Typography>
    </Button>
  </Box>
);
