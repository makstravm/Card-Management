import React from "react";
import { useSelector } from "react-redux";
import { InitialStateType } from "../store/auth/authReducer";
import { RootState } from "../store";

export const Board = () => {
  const { name } = useSelector<RootState, InitialStateType>(
    (state) => state?.auth?.user
  );

  return <h1>{`Your email: ${name}`}</h1>;
};
