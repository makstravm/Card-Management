import { POST } from "api/api";
import { ThunkAction } from "redux-thunk";
import { RootStateType } from "store/store";
import {
  FieldsActionTypes,
  FieldsFailureType,
  FieldsReducerActionsTypes,
  FieldsStartedType,
  FieldsSuccessType,
  FieldStateType,
} from "./types";

export const fieldsStarted = (): FieldsStartedType => ({
  type: FieldsActionTypes.FIELDS_STARTED,
});

export const fieldsSuccess = (payload: FieldStateType): FieldsSuccessType => ({
  type: FieldsActionTypes.FIELDS_SUCCESS,
  payload,
});

export const fieldsFailure = (payload: string): FieldsFailureType => ({
  type: FieldsActionTypes.FIELDS_FAILURE,
  payload,
});

export const saveFieldAction =
  (
    values: FieldStateType
  ): ThunkAction<void, RootStateType, unknown, FieldsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(fieldsStarted());
    try {
      const { data } = await POST<FieldStateType, FieldStateType>(
        "fields",
        values
      );

      dispatch(fieldsSuccess(data));
    } catch (error) {
      dispatch(fieldsFailure(error));
    }
  };
