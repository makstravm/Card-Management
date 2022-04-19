import {
  FieldsActionTypes,
  FieldsReducerActionsTypes,
  InitialStateFieldsListType,
} from "./types";

const {
  FIELDS_ACTION_STARTED,
  FIELDS_ACTION_FAILURE,
  SET_FIELD_SUCCESS,
  GET_FIELDS_SUCCESS,
  GET_FIELD_TYPES_SUCCESS,
} = FieldsActionTypes;

const initailState: InitialStateFieldsListType = {
  fieldsList: [],
  fieldTypes: [],
  loading: false,
  error: null,
};

export const fieldsReducer = (
  state = initailState,
  action: FieldsReducerActionsTypes
) => {
  switch (action.type) {
    case FIELDS_ACTION_STARTED:
      return {
        ...state,
        loading: true,
      };

    case FIELDS_ACTION_FAILURE:
      return {
        ...state,
        loading: false,
        fieldsList: null,
        fieldTypes: null,
        error: action.payload,
      };

    case SET_FIELD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case GET_FIELDS_SUCCESS:
      return {
        ...state,
        loading: false,
        fieldsList: [...action.payload],
        error: null,
      };

    case GET_FIELD_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        fieldTypes: [...action.payload],
        error: null,
      };

    default:
      return state;
  }
};
