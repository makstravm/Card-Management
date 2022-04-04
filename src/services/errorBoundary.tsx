import Cookies from "js-cookie";
import { ErrorBoundaryPropsType } from "./types";
import { notify } from "../utils/toast";

export const errorBoundary = ({ status, data }: ErrorBoundaryPropsType) => {
  switch (status) {
    case 400:
      return notify(data);

    case 401:
      Cookies.remove("token");
      notify(data);

      return window.location.reload();

    default:
      return notify(`что-то не так ${data}`);
  }
};
