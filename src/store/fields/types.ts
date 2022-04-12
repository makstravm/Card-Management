export enum FieldsActionTypes {
  SET_FIELD_STARTED = "SET_FIELD_STARTED",
  SET_FIELD_SUCCESS = "SET_FIELD_SUCCESS",
  SET_FIELD_FAILURE = "SET_FIELD_FAILURE",
  GET_FIELDS_STARTED = "GET_FIELDS_STARTED",
  GET_FIELDS_SUCCESS = "GET_FIELDS_SUCCESS",
  GET_FIELDS_FAILURE = "GET_FIELDS_FAILURE",
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

export type SetFieldStartedType = {
  type: FieldsActionTypes.SET_FIELD_STARTED;
};

export type SetFieldSuccessType = {
  type: FieldsActionTypes.SET_FIELD_SUCCESS;
  payload: FieldStateType;
};

export type SetFieldFailureType = {
  type: FieldsActionTypes.SET_FIELD_FAILURE;
  payload: string | null;
};
export type GetFieldsStartedType = {
  type: FieldsActionTypes.GET_FIELDS_STARTED;
};

export type GetFieldsSuccessType = {
  type: FieldsActionTypes.GET_FIELDS_SUCCESS;
  payload: FieldStateType[];
};

export type GetFieldsFailureType = {
  type: FieldsActionTypes.GET_FIELDS_FAILURE;
  payload: string | null;
};

export type FieldsReducerActionsTypes =
  | SetFieldFailureType
  | SetFieldSuccessType
  | SetFieldStartedType
  | GetFieldsFailureType
  | GetFieldsSuccessType
  | GetFieldsStartedType;
