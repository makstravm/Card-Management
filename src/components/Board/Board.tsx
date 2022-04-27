import React from "react";

import { Container } from "@mui/material";

import { BoardControlPanel } from "./BoardControlPanel/BoardControlPanel";
import { BoardRenderCard } from "./BoardRenderCard/BoardRenderCard";

export const Board = () => (
  <Container maxWidth="lg">
    <BoardControlPanel />
    <BoardRenderCard />
  </Container>
);
