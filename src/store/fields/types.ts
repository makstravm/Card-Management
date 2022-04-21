import { UpdateFieldsToCardType } from "store/cards/types";

export enum FieldsActionTypes {
  FIELDS_ACTION_STARTED = "FIELDS_ACTION_STARTED",
  FIELDS_ACTION_FAILURE = "FIELDS_ACTION_FAILURE",
  SET_FIELD_SUCCESS = "SET_FIELD_SUCCESS",
  GET_FIELDS_SUCCESS = "GET_FIELDS_SUCCESS",
  GET_FIELD_TYPES_SUCCESS = "GET_FIELD_TYPES_SUCCESS",
  UPDATE_FIELD_SUCCESS = "UPDATE_FIELD_SUCCESS",
  DELETE_FIELD_SUCCESS = "DELETE_FIELD_SUCCESS",
}

export type OptionsType = {
  id: string;
  value: string;
};

export type FieldStateType = {
  id?: number;
  name: string;
  type: string;
  required: boolean;
  options: OptionsType[] | [];
};

export type InitialStateFieldsListType = {
  fieldsList: FieldStateType[] | [];
  fieldTypes: OptionsType[] | [];
  error: string | null;
  loading: boolean;
};

export type FieldsActionStartedType = {
  type: FieldsActionTypes.FIELDS_ACTION_STARTED;
};

export type FieldsActionFailureType = {
  type: FieldsActionTypes.FIELDS_ACTION_FAILURE;
  payload: string | null;
};

export type SetFieldSuccessType = {
  type: FieldsActionTypes.SET_FIELD_SUCCESS;
};

export type GetFieldsSuccessType = {
  type: FieldsActionTypes.GET_FIELDS_SUCCESS;
  payload: FieldStateType[];
};

export type GetFieldTypesSuccessType = {
  type: FieldsActionTypes.GET_FIELD_TYPES_SUCCESS;
  payload: OptionsType[];
};

export type UpdateFieldSuccessType = {
  type: FieldsActionTypes.UPDATE_FIELD_SUCCESS;
  payload: FieldStateType;
};

export type DeleteFieldSuccessType = {
  type: FieldsActionTypes.DELETE_FIELD_SUCCESS;
  payload: number;
};

export type FieldsReducerActionsTypes =
  | FieldsActionStartedType
  | FieldsActionFailureType
  | SetFieldSuccessType
  | GetFieldsSuccessType
  | GetFieldTypesSuccessType
  | UpdateFieldsToCardType
  | UpdateFieldSuccessType
  | DeleteFieldSuccessType;
