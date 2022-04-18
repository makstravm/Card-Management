import React from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDataUserAction } from "store/auth/actions";
import { selectUserState } from "store/auth/selectors";
import { RoutesUrls } from "constants/routes";
import { jwtDecode } from "helpers/jwtDecode";

const { LOGIN } = RoutesUrls;

export const PrivateRoute = () => {
  const dispatch = useDispatch();

  const userName = useSelector(selectUserState);

  const location = useLocation();

  const isAuthentification = Cookies.get("token");

  if (!isAuthentification) {
    return <Navigate to={LOGIN} state={location} />;
  }
  if (!userName) {
    const user = jwtDecode(isAuthentification);

    dispatch(getDataUserAction(user.sub));
  }

  return <Outlet />;
};
