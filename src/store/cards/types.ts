import { HideModalActionType } from "store/modals/types";

export enum CardsActionTypes {
  CARDS_ACTION_STARTED = "CARDS_ACTION_STARTED",
  CARDS_ACTION_FAILURE = "CARDS_ACTION_FAILURE",
  SET_CARD_SUCCESS = "SET_CARD_SUCCESS",
  GET_CARDS_SUCCESS = "GET_CARDS_SUCCESS",
  UPDATE_FIELDS_CARD = "UPDATE_FIELDS_CARD",
  UPDATE_CARD_SUCCESS = "UPDATE_CARD_SUCCESS",
  DELETE_CARD_SUCCESS = "DELETE_CARD_SUCCESS",
}

export type CardType = {
  id: number;
  [key: string]: string | boolean | number;
};

export type InitialStateCardsListType = {
  cardsList: CardType[];
  error: string | null;
  loading: boolean;
};

export type CardsActionStartedType = {
  type: CardsActionTypes.CARDS_ACTION_STARTED;
};

export type CardsActionFailureType = {
  type: CardsActionTypes.CARDS_ACTION_FAILURE;
  payload: string | null;
};

export type SetCardSuccessType = {
  type: CardsActionTypes.SET_CARD_SUCCESS;
  payload: CardType;
};

export type GetCardsSuccessType = {
  type: CardsActionTypes.GET_CARDS_SUCCESS;
  payload: CardType[];
};

export type UpdateFieldsToCardType = {
  type: CardsActionTypes.UPDATE_FIELDS_CARD;
  payload: CardType[];
};

export type UpdateCardSuccessType = {
  type: CardsActionTypes.UPDATE_CARD_SUCCESS;
  payload: CardType;
};

export type DeleteCardSuccessType = {
  type: CardsActionTypes.DELETE_CARD_SUCCESS;
  payload: CardType["id"];
};

export type CardsReducerActionsTypes =
  | HideModalActionType
  | CardsActionStartedType
  | CardsActionFailureType
  | SetCardSuccessType
  | GetCardsSuccessType
  | UpdateFieldsToCardType
  | UpdateCardSuccessType
  | DeleteCardSuccessType;
