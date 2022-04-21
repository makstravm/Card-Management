import { DELETE, GET, POST, PUT } from "api/api";
import { Endpoints } from "constants/endpoints";
import { TypesFields } from "constants/typesFields";
import { renameKeyObj } from "helpers/renameKeyObj";
import { ThunkAction } from "redux-thunk";
import { updateCard } from "store/cards/actions";
import { CardType } from "store/cards/types";
import { RootStateType } from "store/store";
import {
  FieldsActionFailureType,
  FieldsActionStartedType,
  FieldsActionTypes,
  FieldsReducerActionsTypes,
  FieldStateType,
  GetFieldsSuccessType,
  GetFieldTypesSuccessType,
  OptionsType,
  SetFieldSuccessType,
  UpdateFieldType,
} from "./types";

const { FIELDS, CARDS, FIELD_TYPES } = Endpoints;

const { CHECKBOX } = TypesFields;

export const fieldsActionStarted = (): FieldsActionStartedType => ({
  type: FieldsActionTypes.FIELDS_ACTION_STARTED,
});

export const fieldsActionFailure = (
  payload: string
): FieldsActionFailureType => ({
  type: FieldsActionTypes.FIELDS_ACTION_FAILURE,
  payload,
});

export const setFieldSuccess = (): SetFieldSuccessType => ({
  type: FieldsActionTypes.SET_FIELD_SUCCESS,
});

export const getFieldsSuccess = (
  payload: FieldStateType[]
): GetFieldsSuccessType => ({
  type: FieldsActionTypes.GET_FIELDS_SUCCESS,
  payload,
});

export const getFieldTypesSuccess = (
  payload: OptionsType[]
): GetFieldTypesSuccessType => ({
  type: FieldsActionTypes.GET_FIELD_TYPES_SUCCESS,
  payload,
});

export const updateField = (payload: FieldStateType): UpdateFieldType => ({
  type: FieldsActionTypes.UPDATE_FIELD,
  payload,
});

export const saveFieldAction =
  (
    values: FieldStateType
  ): ThunkAction<void, RootStateType, unknown, FieldsReducerActionsTypes> =>
  async (dispatch, getState) => {
    dispatch(fieldsActionStarted());
    try {
      await POST<FieldStateType, FieldStateType>(FIELDS, values);
      const cards = getState().cards.cardsList;

      const newCardList = cards.map(async (card: CardType) => {
        const newCard = {
          ...card,
          [values.name]:
            values.type !== CHECKBOX
              ? values.options?.[0]?.value || "---"
              : false,
        };

        const { data } = await PUT<CardType, CardType>(
          `${CARDS}/${card.id}`,
          newCard
        );

        return data;
      });

      const result = await Promise.all(newCardList);

      dispatch(updateCard(result));
      dispatch(setFieldSuccess());
    } catch (error) {
      dispatch(fieldsActionFailure(error));
    }
  };

export const editFieldAction =
  (
    oldName: string,
    values: FieldStateType
  ): ThunkAction<void, RootStateType, unknown, FieldsReducerActionsTypes> =>
  async (dispatch, getState) => {
    dispatch(fieldsActionStarted());
    try {
      await PUT<FieldStateType, FieldStateType>(
        `${FIELDS}/${values.id}`,
        values
      );
      const cards = getState().cards.cardsList;

      const newCardList = cards.map(async (card: CardType) => {
        const value =
          values.type !== CHECKBOX
            ? (typeof card[oldName] !== "boolean" && card[oldName]) || "---"
            : !!card[oldName];

        const newCard = renameKeyObj(card, oldName, values.name, value);

        const { data } = await PUT<CardType, Omit<CardType, "id">>(
          `${CARDS}/${card.id}`,
          newCard
        );

        return data;
      });

      const result = await Promise.all(newCardList);

      dispatch(updateCard(result));
      dispatch(setFieldSuccess());
    } catch (error) {
      dispatch(fieldsActionFailure(error));
    }
  };

export const getAllFieldAction =
  (): ThunkAction<void, RootStateType, unknown, FieldsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(fieldsActionStarted());
    try {
      const { data } = await GET(FIELDS);

      dispatch(getFieldsSuccess(data));
    } catch (error) {
      dispatch(fieldsActionFailure(error));
    }
  };

export const getFieldTypesAction =
  (): ThunkAction<void, RootStateType, unknown, FieldsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(fieldsActionStarted());
    try {
      const { data } = await GET(FIELD_TYPES);

      dispatch(getFieldTypesSuccess(data));
    } catch (error) {
      dispatch(fieldsActionFailure(error));
    }
  };

export const deleteFieldAction =
  (
    id: number,
    name: string
  ): ThunkAction<void, RootStateType, unknown, FieldsReducerActionsTypes> =>
  async (dispatch, getState) => {
    dispatch(fieldsActionStarted());
    try {
      await DELETE(`${FIELDS}/${id}`);
      const cards = getState().cards.cardsList;

      const newCardList = cards.map(async (card: CardType) => {
        delete card[name];

        const { data } = await PUT<CardType, CardType>(
          `${CARDS}/${card.id}`,
          card
        );

        return data;
      });

      const result = await Promise.all(newCardList);

      dispatch(updateCard(result));
    } catch (error) {
      dispatch(fieldsActionFailure(error));
    }
  };

export const deleteFieldOptionAction =
  (
    id: number,
    field: FieldStateType
  ): ThunkAction<void, RootStateType, unknown, FieldsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(fieldsActionStarted());
    try {
      const { data } = await PUT<FieldStateType, FieldStateType>(
        `${FIELDS}/${id}`,
        field
      );

      dispatch(updateField(data));
    } catch (error) {
      dispatch(fieldsActionFailure(error));
    }
  };
