import React from "react";

type typeBoard = {
  text: string;
};

export const Board = ({ text }: typeBoard) => <h1>{text}</h1>;
