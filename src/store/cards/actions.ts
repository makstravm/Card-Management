import { GET, POST } from "api/api";
import { Endpoints } from "constants/endpoints";
import { ThunkAction } from "redux-thunk";
import { RootStateType } from "store/store";
import {
  CarddsReducerActionsTypes,
  CardsActionFailureType,
  CardsActionStartedType,
  CardsActionTypes,
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

export const setCardSuccess = (payload: any): SetCardSuccessType => ({
  type: CardsActionTypes.SET_CARD_SUCCESS,
  payload,
});

export const getCardsSuccess = (payload: any): GetCardsSuccessType => ({
  type: CardsActionTypes.GET_CARDS_SUCCESS,
  payload,
});

export const saveCardAction =
  (
    values: any
  ): ThunkAction<void, RootStateType, unknown, CarddsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(cardsActionStarted());
    try {
      const { data } = await POST<any, any>(CARDS, values);

      dispatch(setCardSuccess(data));
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
