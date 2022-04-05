import { ReactNode } from "react";
import {
  HideModalActionType,
  ModalActionTypes,
  ShowModalActionType,
} from "./types";

export const showModal = (
  title?: string,
  component?: ReactNode
): ShowModalActionType => ({
  type: ModalActionTypes.SHOW_MODAL,
  title,
  component,
});

export const hideModal = (): HideModalActionType => ({
  type: ModalActionTypes.HIDE_MODAL,
});
