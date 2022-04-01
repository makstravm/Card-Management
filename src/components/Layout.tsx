import React from "react";
import { Outlet } from "react-router-dom";

import { links } from "constants/links/links";

import { Header } from "./Header/Header";

export const Layout = () => (
  <>
    <Header linksNavBar={links} />
    <Outlet />
    <footer>Footer</footer>
  </>
);
