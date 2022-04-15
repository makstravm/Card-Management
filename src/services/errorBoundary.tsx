import { notify } from "../utils/toast";
import { ErrorBoundaryPropsType } from "./types";

export const errorBoundary = ({ status, data }: ErrorBoundaryPropsType) => {
  switch (status) {
    case 400:
      return notify(data);

    case 401:
      return notify(data);

    default:
      return notify(`что-то не так ${data}`);
  }
};
