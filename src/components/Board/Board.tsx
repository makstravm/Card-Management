import React from "react";

import { Container } from "@mui/material";

import { CardsList } from "components/CardsList/CardsList";
import { BoardControlPanel } from "./BoardControlPanel/BoardControlPanel";

export const Board = () => (
  <Container maxWidth="lg">
    <BoardControlPanel />
    <CardsList />
  </Container>
);
