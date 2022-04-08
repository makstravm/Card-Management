import { POST } from "api/api";
import { ThunkAction } from "redux-thunk";
import { RootStateType } from "store/store";
import {
  FieldsActionTypes,
  FieldsFailureType,
  FieldsReducerActionsTypes,
  FieldsStartedType,
  FieldsStateResponseType,
  FieldsStateType,
  FieldsSuccessType,
} from "./types";

export const fieldsStarted = (): FieldsStartedType => ({
  type: FieldsActionTypes.FIELDS_STARTED,
});

export const fieldsSuccess = (
  payload: FieldsStateResponseType
): FieldsSuccessType => ({
  type: FieldsActionTypes.FIELDS_SUCCESS,
  payload,
});

export const fieldsFailure = (payload: string): FieldsFailureType => ({
  type: FieldsActionTypes.FIELDS_FAILURE,
  payload,
});

export const saveFieldAction =
  (
    values: FieldsStateType
  ): ThunkAction<void, RootStateType, unknown, FieldsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(fieldsStarted());
    try {
      const { data } = await POST<FieldsStateResponseType, FieldsStateType>(
        "fields",
        values
      );

      dispatch(fieldsSuccess(data));
    } catch (error) {
      dispatch(fieldsFailure(error));
    }
  };
