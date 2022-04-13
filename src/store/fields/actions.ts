import { GET, POST } from "api/api";
import { ThunkAction } from "redux-thunk";
import { RootStateType } from "store/store";
import {
  FieldsActionFailureType,
  FieldsActionStartedType,
  FieldsActionTypes,
  FieldsReducerActionsTypes,
  FieldStateType,
  GetFieldsSuccessType,
  SetFieldSuccessType,
} from "./types";

export const fieldsActionStarted = (): FieldsActionStartedType => ({
  type: FieldsActionTypes.FIELDS_ACTION_STARTED,
});

export const fieldsActionFailure = (
  payload: string
): FieldsActionFailureType => ({
  type: FieldsActionTypes.FIELDS_ACTION_FAILURE,
  payload,
});

export const setFieldSuccess = (
  payload: FieldStateType
): SetFieldSuccessType => ({
  type: FieldsActionTypes.SET_FIELD_SUCCESS,
  payload,
});

export const getFieldsSuccess = (
  payload: FieldStateType[]
): GetFieldsSuccessType => ({
  type: FieldsActionTypes.GET_FIELDS_SUCCESS,
  payload,
});

export const saveFieldAction =
  (
    values: FieldStateType
  ): ThunkAction<void, RootStateType, unknown, FieldsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(fieldsActionStarted());
    try {
      const { data } = await POST<FieldStateType, FieldStateType>(
        "fields",
        values
      );

      dispatch(setFieldSuccess(data));
    } catch (error) {
      dispatch(fieldsActionFailure(error));
    }
  };

export const getAllFieldction =
  (): ThunkAction<void, RootStateType, unknown, FieldsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(fieldsActionStarted());
    try {
      const { data } = await GET("fields");

      dispatch(getFieldsSuccess(data));
    } catch (error) {
      dispatch(fieldsActionFailure(error));
    }
  };
