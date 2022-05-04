import React, { useContext } from "react";
import Cookies from "js-cookie";
import { observer } from "mobx-react-lite";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { RoutesUrls } from "constants/routes";

import { jwtDecode } from "helpers/jwtDecode";

import { StoreContext } from "store/index";

const { LOGIN } = RoutesUrls;

export const PrivateRoute = observer(() => {
  const { getDataUserAction, user } = useContext(StoreContext).auth;

  const location = useLocation();

  const isAuthentification = Cookies.get("token");

  if (!isAuthentification) {
    return <Navigate to={LOGIN} state={location} />;
  }
  if (!user) {
    const { sub } = jwtDecode(isAuthentification);

    getDataUserAction(sub);
  }

  return <Outlet />;
});
