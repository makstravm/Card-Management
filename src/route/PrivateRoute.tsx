import React from "react";
import Cookies from "js-cookie";
import { observer } from "mobx-react-lite";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { RoutesUrls } from "constants/routes";

import auth from "store/auth/Authentification";

import { jwtDecode } from "helpers/jwtDecode";

const { LOGIN } = RoutesUrls;

export const PrivateRoute = observer(() => {
  const userName = auth?.user;

  const location = useLocation();

  const isAuthentification = Cookies.get("token");

  if (!isAuthentification) {
    return <Navigate to={LOGIN} state={location} />;
  }
  if (!userName) {
    const user = jwtDecode(isAuthentification);

    auth.getDataUserAction(user.sub);
  }

  return <Outlet />;
});
