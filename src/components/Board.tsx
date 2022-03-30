import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const Board = () => {
  const { name } = useSelector<RootState, any>(
    (state) => state?.auth?.user || "No name"
  );

  return <h1>{`Your name: ${name}`}</h1>;
};
