import { ReactNode } from "react";

export enum ModalActionTypes {
  SHOW_MODAL = "SHOW_MODAL",
  HIDE_MODAL = "HIDE_MODAL",
}

export type InitialStateModalType = {
  showModal: boolean;
  title: string;
  component: ReactNode | null;
};

export type ShowModalActionType = {
  type: ModalActionTypes.SHOW_MODAL;
  title: string;
  component: ReactNode;
};
export type HideModalActionType = {
  type: ModalActionTypes.HIDE_MODAL;
};

export type ModalReducerActionsTypes =
  | ShowModalActionType
  | HideModalActionType;
