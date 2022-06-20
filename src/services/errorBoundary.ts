import { notifyError } from "utils/toast";
import { ErrorBoundaryPropsType } from "./types";

export const errorBoundary = (err: ErrorBoundaryPropsType) => {
  const error = err?.status || 404;

  switch (error) {
    case 400:
      return notifyError(err?.data);

    case 401:
      return notifyError(err?.data);

    case 404:
      return notifyError(err?.statusText || "Network Error");

    default:
      return notifyError(err?.statusText);
  }
};
