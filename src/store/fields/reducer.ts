import {
  FieldsActionTypes,
  FieldsReducerActionsTypes,
  InitialStateFieldsType,
} from "./types";

const initialState: InitialStateFieldsType = {
  fields: null,
  error: null,
  loading: false,
};

const { FIELDS_STARTED, FIELDS_SUCCESS, FIELDS_FAILURE } = FieldsActionTypes;

export const fieldsReducer = (
  state = initialState,
  action: FieldsReducerActionsTypes
) => {
  switch (action.type) {
    case FIELDS_STARTED:
      return {
        ...state,
        loading: true,
      };

    case FIELDS_SUCCESS:
      return {
        ...state,
        loading: false,
        fields: action.payload,
        error: null,
      };

    case FIELDS_FAILURE:
      return {
        ...state,
        loading: false,
        fields: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
