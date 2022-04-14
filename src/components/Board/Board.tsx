import React from "react";

import { Container } from "@mui/material";

import { BoardControlPanel } from "./BoardControlPanel/BoardControlPanel";
import { BoardAllCards } from "./BoardAllCards/BoardAllCards";

export const Board = () => (
  <Container maxWidth="lg">
    <BoardControlPanel />
    <BoardAllCards />
  </Container>
);
