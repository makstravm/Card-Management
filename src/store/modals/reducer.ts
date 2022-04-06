import {
  InitialStateModalType,
  ModalActionTypes,
  ModalReducerActionsTypes,
} from "./types";

const initialState: InitialStateModalType = {
  showModal: false,
  title: "",
  component: null,
};

const { SHOW_MODAL, HIDE_MODAL } = ModalActionTypes;

export const modalReducer = (
  state = initialState,
  action: ModalReducerActionsTypes
) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        showModal: true,
        title: action.title,
        component: action.component,
      };

    case HIDE_MODAL:
      return {
        ...state,
        showModal: false,
        title: "",
        component: null,
      };

    default:
      return state;
  }
};
