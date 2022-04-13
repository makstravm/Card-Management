// export enum FieldsActionTypes {
//   CARDS_ACTION_STARTED = "CARDS_ACTION_STARTED",
//   CARDS_ACTION_FAILURE = "CARDS_ACTION_FAILURE",
//   SET_CARD_SUCCESS = "SET_CARD_SUCCESS",
//   GET_CARDS_SUCCESS = "GET_CARDS_SUCCESS",
// }

export type CardType<T> = Record<string, T>;

// export type OptionsType = {
//   id: string;
//   value: string;
// };

// export type FieldStateType = {
//   id?: number;
//   name: string;
//   type: FieldTypes;
//   required: boolean;
//   options: OptionsType[] | [];
// };

// export type InitialStateFieldsListType = {
//   fieldsList: FieldStateType[] | [];
//   error: string | null;
//   loading: boolean;
// };

// export type FieldsActionStartedType = {
//   type: FieldsActionTypes.FIELDS_ACTION_STARTED;
// };

// export type FieldsActionFailureType = {
//   type: FieldsActionTypes.FIELDS_ACTION_FAILURE;
//   payload: string | null;
// };

// export type SetFieldSuccessType = {
//   type: FieldsActionTypes.SET_FIELD_SUCCESS;
//   payload: FieldStateType;
// };

// export type GetFieldsSuccessType = {
//   type: FieldsActionTypes.GET_FIELDS_SUCCESS;
//   payload: FieldStateType[];
// };

// export type FieldsReducerActionsTypes =
//   | FieldsActionStartedType
//   | FieldsActionFailureType
//   | SetFieldSuccessType
//   | GetFieldsSuccessType;
