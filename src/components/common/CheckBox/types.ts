import { ChangeEventHandler } from "react";

export type CheckBoxPropsType = {
  name: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  disableRipple: boolean;
};
