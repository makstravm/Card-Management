export enum CardsActionTypes {
  CARDS_ACTION_STARTED = "CARDS_ACTION_STARTED",
  CARDS_ACTION_FAILURE = "CARDS_ACTION_FAILURE",
  SET_CARD_SUCCESS = "SET_CARD_SUCCESS",
  GET_CARDS_SUCCESS = "GET_CARDS_SUCCESS",
  UPDATE_CARD = "UPDATE_CARD",
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
};

export type GetCardsSuccessType = {
  type: CardsActionTypes.GET_CARDS_SUCCESS;
  payload: CardType[];
};

export type UpdateCardType = {
  type: CardsActionTypes.UPDATE_CARD;
  payload: CardType[];
};

export type CarddsReducerActionsTypes =
  | CardsActionStartedType
  | CardsActionFailureType
  | SetCardSuccessType
  | GetCardsSuccessType
  | UpdateCardType;
