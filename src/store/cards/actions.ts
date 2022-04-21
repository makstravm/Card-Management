import { ThunkAction } from "redux-thunk";

import { Endpoints } from "constants/endpoints";

import { DELETE, GET, POST, PUT } from "api/api";

import { RootStateType } from "store/store";

import {
  CardsReducerActionsTypes,
  CardsActionFailureType,
  CardsActionStartedType,
  CardsActionTypes,
  CardType,
  GetCardsSuccessType,
  SetCardSuccessType,
  UpdateFieldsToCardType,
  UpdateCardSuccessType,
} from "./types";

const { CARDS } = Endpoints;

export const cardsActionStarted = (): CardsActionStartedType => ({
  type: CardsActionTypes.CARDS_ACTION_STARTED,
});

export const cardsActionFailure = (
  payload: string
): CardsActionFailureType => ({
  type: CardsActionTypes.CARDS_ACTION_FAILURE,
  payload,
});

export const setCardSuccess = (payload: CardType): SetCardSuccessType => ({
  type: CardsActionTypes.SET_CARD_SUCCESS,
  payload,
});

export const getCardsSuccess = (payload: CardType[]): GetCardsSuccessType => ({
  type: CardsActionTypes.GET_CARDS_SUCCESS,
  payload,
});

export const updateFieldsToCard = (
  payload: CardType[]
): UpdateFieldsToCardType => ({
  type: CardsActionTypes.UPDATE_FIELDS_CARD,
  payload,
});

export const updateCardSuccess = (
  payload: CardType
): UpdateCardSuccessType => ({
  type: CardsActionTypes.UPDATE_CARD_SUCCESS,
  payload,
});

export const saveCardAction =
  (
    values: CardType
  ): ThunkAction<void, RootStateType, unknown, CardsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(cardsActionStarted());
    try {
      const { data } = await POST<CardType, CardType>(CARDS, values);

      dispatch(setCardSuccess(data));
    } catch (error) {
      dispatch(cardsActionFailure(error));
    }
  };

export const editCardAction =
  (
    values: CardType
  ): ThunkAction<void, RootStateType, unknown, CardsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(cardsActionStarted());
    try {
      const { data } = await PUT<CardType, CardType>(
        `${CARDS}/${values.id}`,
        values
      );

      dispatch(updateCardSuccess(data));
    } catch (error) {
      dispatch(cardsActionFailure(error));
    }
  };

export const getAllCardsAction =
  (): ThunkAction<void, RootStateType, unknown, CardsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(cardsActionStarted());
    try {
      const { data } = await GET(CARDS);

      dispatch(getCardsSuccess(data));
    } catch (error) {
      dispatch(cardsActionFailure(error));
    }
  };

export const deleteCardAction =
  (
    id: CardType["id"]
  ): ThunkAction<void, RootStateType, unknown, CardsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(cardsActionStarted());
    try {
      await DELETE(`${CARDS}/${id}`);

      dispatch(getAllCardsAction());
    } catch (error) {
      dispatch(cardsActionFailure(error));
    }
  };
