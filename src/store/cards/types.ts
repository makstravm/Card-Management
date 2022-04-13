export enum CardsActionTypes {
  CARDS_ACTION_STARTED = "CARDS_ACTION_STARTED",
  CARDS_ACTION_FAILURE = "CARDS_ACTION_FAILURE",
  SET_CARD_SUCCESS = "SET_CARD_SUCCESS",
  GET_CARDS_SUCCESS = "GET_CARDS_SUCCESS",
}

export type CardType = Record<string, string | boolean>;

// export type OptionsType = {
//   id: string;
//   value: string;
// };

// export type FieldStateType = {
//   id?: number;
//   name: string;
//   type: FieldTypes;
//   required: boolean;
//   options: OptionsType[] | [];
// };

export type InitialStateCardsListType = {
  cardsList: any;
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
  payload: any;
};

export type GetCardsSuccessType = {
  type: CardsActionTypes.GET_CARDS_SUCCESS;
  payload: any[];
};

export type CarddsReducerActionsTypes =
  | CardsActionStartedType
  | CardsActionFailureType
  | SetCardSuccessType
  | GetCardsSuccessType;
