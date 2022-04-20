import { DELETE, GET, POST, PUT } from "api/api";
import { Endpoints } from "constants/endpoints";
import { TypesFields } from "constants/typesFields";
import { renameKeyObj } from "helpers/renameKeyObj";
import { ThunkAction } from "redux-thunk";
import { getAllCardsAction } from "store/cards/actions";
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

export const saveFieldAction =
  (
    values: FieldStateType
  ): ThunkAction<void, RootStateType, unknown, FieldsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(fieldsActionStarted());
    try {
      await POST<FieldStateType, FieldStateType>(FIELDS, values);
      dispatch(setFieldSuccess());
      dispatch(saveFieldToCardAction(values));
    } catch (error) {
      dispatch(fieldsActionFailure(error));
    }
  };

export const editFieldAction =
  (
    oldName: string,
    values: FieldStateType
  ): ThunkAction<void, RootStateType, unknown, FieldsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(fieldsActionStarted());
    try {
      await PUT<FieldStateType, FieldStateType>(
        `${FIELDS}/${values.id}`,
        values
      );
      dispatch(setFieldSuccess());
      dispatch(editFieldToCardAction(oldName, values));
    } catch (error) {
      dispatch(fieldsActionFailure(error));
    }
  };

export const saveFieldToCardAction =
  ({
    name,
    type,
    options,
  }: FieldStateType): ThunkAction<
    void,
    RootStateType,
    unknown,
    FieldsReducerActionsTypes
  > =>
  async (dispatch) => {
    dispatch(fieldsActionStarted());
    try {
      const { data: cards } = await GET(CARDS);

      cards.forEach(async (card: CardType) => {
        await PUT(`${CARDS}/${card.id}`, {
          ...card,
          [name]: type !== CHECKBOX ? options?.[0]?.value || "---" : false,
        });
      });
      dispatch(setFieldSuccess());
      dispatch(getAllCardsAction());
    } catch (error) {
      dispatch(fieldsActionFailure(error));
    }
  };

export const editFieldToCardAction =
  (
    oldName: string,
    { name, type }: FieldStateType
  ): ThunkAction<void, RootStateType, unknown, FieldsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(fieldsActionStarted());
    try {
      const { data: cards } = await GET(CARDS);

      cards.forEach(async (card: CardType) => {
        const value =
          type !== CHECKBOX
            ? (typeof card[oldName] !== "boolean" && card[oldName]) || "---"
            : !!card[oldName];

        const newCard = renameKeyObj(card, oldName, name, value);

        await PUT(`${CARDS}/${card.id}`, newCard);
      });
      dispatch(setFieldSuccess());
      dispatch(getAllCardsAction());
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
  async (dispatch) => {
    dispatch(fieldsActionStarted());
    try {
      await DELETE(`${FIELDS}/${id}`);
      dispatch(deleteFieldToCardAction(name));
      dispatch(getAllFieldAction());
    } catch (error) {
      dispatch(fieldsActionFailure(error));
    }
  };

export const deleteFieldToCardAction =
  (
    keyName: string
  ): ThunkAction<void, RootStateType, unknown, FieldsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(fieldsActionStarted());
    try {
      const { data: cards } = await GET(CARDS);

      cards.forEach(async (card: CardType) => {
        delete card[keyName];

        await PUT(`${CARDS}/${card.id}`, card);
      });
      dispatch(setFieldSuccess());
      dispatch(getAllCardsAction());
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
      await PUT(`${FIELDS}/${id}`, field);

      dispatch(getAllFieldAction());
    } catch (error) {
      dispatch(fieldsActionFailure(error));
    }
  };
