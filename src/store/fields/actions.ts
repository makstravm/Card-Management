import { GET, POST } from "api/api";
import { ThunkAction } from "redux-thunk";
import { RootStateType } from "store/store";
import {
  FieldsActionTypes,
  FieldsReducerActionsTypes,
  FieldStateType,
  GetFieldsFailureType,
  GetFieldsStartedType,
  GetFieldsSuccessType,
  SetFieldFailureType,
  SetFieldStartedType,
  SetFieldSuccessType,
} from "./types";

export const setFieldStarted = (): SetFieldStartedType => ({
  type: FieldsActionTypes.SET_FIELD_STARTED,
});

export const setFieldSuccess = (
  payload: FieldStateType
): SetFieldSuccessType => ({
  type: FieldsActionTypes.SET_FIELD_SUCCESS,
  payload,
});

export const setFieldFailure = (payload: string): SetFieldFailureType => ({
  type: FieldsActionTypes.SET_FIELD_FAILURE,
  payload,
});
export const getFieldsStarted = (): GetFieldsStartedType => ({
  type: FieldsActionTypes.GET_FIELDS_STARTED,
});

export const getFieldsSuccess = (
  payload: FieldStateType[]
): GetFieldsSuccessType => ({
  type: FieldsActionTypes.GET_FIELDS_SUCCESS,
  payload,
});

export const getFieldsFailure = (payload: string): GetFieldsFailureType => ({
  type: FieldsActionTypes.GET_FIELDS_FAILURE,
  payload,
});

export const saveFieldAction =
  (
    values: FieldStateType
  ): ThunkAction<void, RootStateType, unknown, FieldsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(setFieldStarted());
    try {
      const { data } = await POST<FieldStateType, FieldStateType>(
        "fields",
        values
      );

      dispatch(setFieldSuccess(data));
    } catch (error) {
      dispatch(setFieldFailure(error));
    }
  };

export const getAllFieldction =
  (): ThunkAction<void, RootStateType, unknown, FieldsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(getFieldsStarted());
    try {
      const { data } = await GET("fields");

      dispatch(getFieldsSuccess(data));
    } catch (error) {
      dispatch(getFieldsFailure(error));
    }
  };
