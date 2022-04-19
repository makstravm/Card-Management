import { v1 } from "uuid";

export const initialField = {
  name: "",
  type: "",
  required: false,
  options: [
    { id: v1(), value: "" },
    { id: v1(), value: "" },
  ],
};
