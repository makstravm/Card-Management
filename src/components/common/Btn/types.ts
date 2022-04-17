import { ReactNode } from "react";

export type BtnPropsType = {
  title?: string;
  handleClick?: () => void;
  icon?: ReactNode;
  variantBtn: "text" | "outlined" | "contained";
  type?: "submit" | "button";
  disabled?: boolean;
};
