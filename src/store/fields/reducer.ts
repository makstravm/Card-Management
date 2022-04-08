import {
  FieldsActionTypes,
  FieldsReducerActionsTypes,
  InitialStateFieldsListType,
} from "./types";

const { FIELDS_STARTED, FIELDS_SUCCESS, FIELDS_FAILURE } = FieldsActionTypes;

const initailState: InitialStateFieldsListType = {
  fieldsList: [],
  loading: false,
  error: null,
};

export const fieldsReducer = (
  state = initailState,
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
        fieldsList: [...state.fieldsList, action.payload],
        error: null,
      };

    case FIELDS_FAILURE:
      return {
        ...state,
        loading: false,
        fieldsList: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
