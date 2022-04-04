import React from "react";
import { useSelector } from "react-redux";

import { selectUserState } from "store/auth/selectors";

export const Board = () => {
  const userName = useSelector(selectUserState);

  return <h1>{`Your name: ${userName || "No name"}`}</h1>;
};
