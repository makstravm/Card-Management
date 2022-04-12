import React from "react";

import { Container } from "@mui/material";

import { boardsNamesColumns } from "constants/board/boards";

import { FieldsList } from "components/FieldsList/FieldsList";
import { BoardColumns } from "./BoardColumns/BoardColumns";
import { BoardControlPanel } from "./BoardControlPanel/BoardControlPanel";

export const Board = () => (
  <Container maxWidth="lg">
    <BoardControlPanel />
    <BoardColumns boardsColumns={boardsNamesColumns} />
    <FieldsList />
  </Container>
);
