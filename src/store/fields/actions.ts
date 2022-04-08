import { POST } from "api/api";
import { ThunkAction } from "redux-thunk";
import { RootStateType } from "store/store";
import {
  FieldsActionTypes,
  FieldsFailureType,
  FieldsReducerActionsTypes,
  FieldsStartedType,
  FieldsSuccessType,
} from "./types";

export const fieldsStarted = (): FieldsStartedType => ({
  type: FieldsActionTypes.FIELDS_STARTED,
});

export const fieldsSuccess = (payload: any): FieldsSuccessType => ({
  type: FieldsActionTypes.FIELDS_SUCCESS,
  payload,
});

export const fieldsFailure = (payload: string): FieldsFailureType => ({
  type: FieldsActionTypes.FIELDS_FAILURE,
  payload,
});

export const saveFieldAction =
  (
    values: any
  ): ThunkAction<void, RootStateType, unknown, FieldsReducerActionsTypes> =>
  async (dispatch) => {
    dispatch(fieldsStarted());
    try {
      const { data } = await POST<any>("fields", values);

      console.log(data);

      dispatch(fieldsSuccess(data));
    } catch (error) {
      dispatch(fieldsFailure(error));
    }
  };
