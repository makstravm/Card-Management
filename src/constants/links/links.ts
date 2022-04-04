import { v1 } from "uuid";

import { RoutesUrls } from "../routes";

const { LOGIN, REGISTRATION, BOARD } = RoutesUrls;

export const links = [
  {
    id: v1(),
    title: "Log In",
    link: LOGIN,
  },
  {
    id: v1(),
    title: "Registration",
    link: REGISTRATION,
  },
  {
    id: v1(),
    title: "Board",
    link: BOARD,
  },
];
