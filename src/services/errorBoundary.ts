import { notifyError } from "utils/toast";
import { ErrorBoundaryPropsType } from "./types";

export const errorBoundary = ({
  status,
  data,
  statusText,
}: ErrorBoundaryPropsType) => {
  switch (status) {
    case 400:
      return notifyError(data);

    case 401:
      return notifyError(data);

    case 404:
      return notifyError(statusText);

    default:
      return notifyError(statusText);
  }
};
