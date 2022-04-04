import { AxiosError } from "axios";
import { notify } from "../utils/toast";

export const errorBoundary = ({ response: { status, data } }: AxiosError) => {
  switch (status) {
    case 400:
      return notify(data);

    case 401:
      return notify(data);

    default:
      return notify(`что-то не так ${data}`);
  }
};
