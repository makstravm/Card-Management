import { ChangeEventHandler } from "react";

export type CheckBoxPropsType = {
  name: string;
  checked: boolean;
  handleChange: ChangeEventHandler<HTMLInputElement>;
};
