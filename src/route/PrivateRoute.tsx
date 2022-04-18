import React from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDataUserAction } from "store/auth/actions";
import { selectUserState } from "store/auth/selectors";

const jwtDecode = (token: string) => {
  try {
    const arrToken = token.split(".");

    const base64Token = atob(arrToken[1]);

    return JSON.parse(base64Token);
  } catch (e) {
    return `Ой, ошибочка вышла ${e}`;
  }
};

export const PrivateRoute = () => {
  const dispatch = useDispatch();

  const userName = useSelector(selectUserState);

  const isAuthentification = Cookies.get("token");

  if (!isAuthentification) {
    return <Navigate to="/login" />;
  }
  if (!userName) {
    const user = jwtDecode(isAuthentification);

    dispatch(getDataUserAction(user.sub));
  }

  return <Outlet />;
};
