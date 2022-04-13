export enum FieldsActionTypes {
  FIELDS_ACTION_STARTED = "FIELDS_ACTION_STARTED",
  FIELDS_ACTION_FAILURE = "FIELDS_ACTION_FAILURE",
  SET_FIELD_SUCCESS = "SET_FIELD_SUCCESS",
  GET_FIELDS_SUCCESS = "GET_FIELDS_SUCCESS",
}
export type FieldTypes = "text" | "checkbox" | "select";

export type OptionsType = {
  id: string;
  value: string;
};

export type FieldStateType = {
  id?: number;
  name: string;
  type: FieldTypes;
  required: boolean;
  options: OptionsType[] | [];
};

export type InitialStateFieldsListType = {
  fieldsList: FieldStateType[] | [];
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
  payload: FieldStateType;
};

export type GetFieldsSuccessType = {
  type: FieldsActionTypes.GET_FIELDS_SUCCESS;
  payload: FieldStateType[];
};

export type FieldsReducerActionsTypes =
  | FieldsActionStartedType
  | FieldsActionFailureType
  | SetFieldSuccessType
  | GetFieldsSuccessType;
