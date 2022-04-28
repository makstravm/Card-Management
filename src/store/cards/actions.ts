import { ThunkAction } from "redux-thunk";

import { Endpoints } from "constants/endpoints";

import { DELETE, GET, POST, PUT } from "api/index";

import { hideModal } from "store/modals/actions";

import { notifySuccess } from "utils/toast";

import { RootStateType } from "..";
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
  DeleteCardSuccessType,
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

export const deleteCardSuccess = (
  payload: CardType["id"]
): DeleteCardSuccessType => ({
  type: CardsActionTypes.DELETE_CARD_SUCCESS,
  payload,
});

export const saveCardAction =
  (
    values: CardType | Omit<CardType, "id">
  ): ThunkAction<void, RootStateType, unknown, CardsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(cardsActionStarted());
    try {
      const { data } = await POST<CardType, CardType | Omit<CardType, "id">>(
        CARDS,
        values
      );

      dispatch(hideModal());
      notifySuccess("Card created");
      dispatch(setCardSuccess(data));
    } catch (error) {
      dispatch(cardsActionFailure(error));
    }
  };

export const editCardAction =
  (
    values: CardType | Omit<CardType, "id">
  ): ThunkAction<void, RootStateType, unknown, CardsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(cardsActionStarted());
    try {
      const { data } = await PUT<CardType, CardType | Omit<CardType, "id">>(
        `${CARDS}/${values.id}`,
        values
      );

      dispatch(hideModal());
      notifySuccess("Card edited");
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
      await DELETE<CardType>(`${CARDS}/${id}`);

      notifySuccess("Card deleted");
      dispatch(deleteCardSuccess(id));
    } catch (error) {
      dispatch(cardsActionFailure(error));
    }
  };
// values: CardType | Omit<CardType, "id">
export const moveEditCardAction =
  (
    id: number,
    key: string,
    value: string
  ): ThunkAction<void, RootStateType, unknown, CardsReducerActionsTypes> =>
  async (dispatch, getState) => {
    dispatch(cardsActionStarted());
    try {
      const { cardsList } = getState().cards;

      const card = cardsList.find((c) => c.id === id);

      if (value === "false" || value === "true") {
        card[key] = JSON.parse(value);
      } else {
        card[key] = value;
      }
      const { data } = await PUT<CardType, CardType | Omit<CardType, "id">>(
        `${CARDS}/${id}`,
        card
      );

      dispatch(updateCardSuccess(data));

      notifySuccess("Card edited");
    } catch (error) {
      dispatch(cardsActionFailure(error));
    }
  };
