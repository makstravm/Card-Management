export enum FieldsActionTypes {
  FIELDS_STARTED = "FIELDS_STARTED",
  FIELDS_SUCCESS = "FIELDS_SUCCESS",
  FIELDS_FAILURE = "FIELDS_FAILURE",
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
  fieldsList: FieldStateType[];
  error: string | null;
  loading: boolean;
};

export type FieldsStartedType = {
  type: FieldsActionTypes.FIELDS_STARTED;
};

export type FieldsSuccessType = {
  type: FieldsActionTypes.FIELDS_SUCCESS;
  payload: FieldStateType;
};

export type FieldsFailureType = {
  type: FieldsActionTypes.FIELDS_FAILURE;
  payload: string | null;
};

export type FieldsReducerActionsTypes =
  | FieldsFailureType
  | FieldsSuccessType
  | FieldsStartedType;
