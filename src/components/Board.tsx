import React from "react";
import { useSelector } from "react-redux";
import { InitialStateType } from "../redux/AuthReducer";
import { RootState } from "../redux/store";

export const Board = () => {
  const { name } = useSelector<RootState, InitialStateType>(
    (state) => state?.auth
  );

  return <h1>{`Your email: ${name}`}</h1>;
};
