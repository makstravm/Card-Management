export enum FieldsActionTypes {
  FIELDS_STARTED = "FIELDS_STARTED",
  FIELDS_SUCCESS = "FIELDS_SUCCESS",
  FIELDS_FAILURE = "FIELDS_FAILURE",
}

export type FieldTypes = "text" | "checkbox" | "select";

export type FieldsStateType = {
  id?: number;
  name: string;
  type: FieldTypes;
  required: boolean;
  option?: string[];
};

export type InitialStateFieldsType = {
  fields: FieldsStateType | null;
  error: string | null;
  loading: boolean;
};

export type FieldsStartedType = {
  type: FieldsActionTypes.FIELDS_STARTED;
};

export type FieldsSuccessType = {
  type: FieldsActionTypes.FIELDS_SUCCESS;
  payload: FieldsStateType;
};

export type FieldsFailureType = {
  type: FieldsActionTypes.FIELDS_FAILURE;
  payload: string | null;
};

export type FieldsReducerActionsTypes =
  | FieldsFailureType
  | FieldsSuccessType
  | FieldsStartedType;
