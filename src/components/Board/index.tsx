import React from "react";

import { Container } from "@mui/material";

import { BoardControlPanel } from "./BoardControlPanel";
import { BoardRenderCard } from "./BoardRenderCard";

export const Board = () => (
  <Container maxWidth="lg" data-testid="board-container">
    <BoardControlPanel />
    <BoardRenderCard />
  </Container>
);
