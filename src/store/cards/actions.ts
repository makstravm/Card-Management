import { DELETE, GET, POST, PUT } from "api/api";
import { Endpoints } from "constants/endpoints";
import { ThunkAction } from "redux-thunk";
import { RootStateType } from "store/store";
import {
  CarddsReducerActionsTypes,
  CardsActionFailureType,
  CardsActionStartedType,
  CardsActionTypes,
  CardType,
  GetCardsSuccessType,
  SetCardSuccessType,
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

export const setCardSuccess = (): SetCardSuccessType => ({
  type: CardsActionTypes.SET_CARD_SUCCESS,
});

export const getCardsSuccess = (payload: CardType[]): GetCardsSuccessType => ({
  type: CardsActionTypes.GET_CARDS_SUCCESS,
  payload,
});

export const saveCardAction =
  (
    values: CardType
  ): ThunkAction<void, RootStateType, unknown, CarddsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(cardsActionStarted());
    try {
      await POST<CardType, CardType>(CARDS, values);
      dispatch(setCardSuccess());
      dispatch(getAllCardsAction());
    } catch (error) {
      dispatch(cardsActionFailure(error));
    }
  };

export const editCardAction =
  (
    values: CardType
  ): ThunkAction<void, RootStateType, unknown, CarddsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(cardsActionStarted());
    try {
      await PUT(`${CARDS}/${values.id}`, values);
      dispatch(setCardSuccess());
      dispatch(getAllCardsAction());
    } catch (error) {
      dispatch(cardsActionFailure(error));
    }
  };

export const getAllCardsAction =
  (): ThunkAction<void, RootStateType, unknown, CarddsReducerActionsTypes> =>
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
  ): ThunkAction<void, RootStateType, unknown, CarddsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(cardsActionStarted());
    try {
      await DELETE(`${CARDS}/${id}`);

      dispatch(getAllCardsAction());
    } catch (error) {
      dispatch(cardsActionFailure(error));
    }
  };
