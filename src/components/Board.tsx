import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { InitialStateAuthType } from "../store/auth/types";

export const Board = () => {
  const { user } = useSelector<RootState, InitialStateAuthType>(
    (state) => state?.auth
  );

  return <h1>{`Your name: ${user?.name || "No name"}`}</h1>;
};
