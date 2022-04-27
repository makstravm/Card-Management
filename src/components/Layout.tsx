import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "./Header";
import { Modal } from "./common/Modal";

export const Layout = () => (
  <>
    <Header />
    <Outlet />
    <footer>Footer</footer>
    <Modal />
  </>
);
