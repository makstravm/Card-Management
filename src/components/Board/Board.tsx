import React from "react";

import { Container } from "@mui/material";

import { boardsNamesColumns } from "constants/board/boards";

import { BoardHeader } from "./BoardHeader/BoardHeader";
import { BoardColumns } from "./BoardColumns/BoardColumns";

export const Board = () => (
  <Container maxWidth="lg">
    <BoardHeader />
    <BoardColumns boardsColumns={boardsNamesColumns} />
  </Container>
);
