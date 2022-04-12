import {
  FieldsActionTypes,
  FieldsReducerActionsTypes,
  InitialStateFieldsListType,
} from "./types";

const {
  SET_FIELD_STARTED,
  SET_FIELD_SUCCESS,
  SET_FIELD_FAILURE,
  GET_FIELDS_STARTED,
  GET_FIELDS_SUCCESS,
  GET_FIELDS_FAILURE,
} = FieldsActionTypes;

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
    case SET_FIELD_STARTED:
      return {
        ...state,
        loading: true,
      };

    case SET_FIELD_SUCCESS:
      return {
        ...state,
        loading: false,
        fieldsList: [action.payload],
        error: null,
      };

    case SET_FIELD_FAILURE:
      return {
        ...state,
        loading: false,
        fieldsList: null,
        error: action.payload,
      };

    case GET_FIELDS_STARTED:
      return {
        ...state,
        loading: true,
      };

    case GET_FIELDS_SUCCESS:
      return {
        ...state,
        loading: false,
        fieldsList: [...action.payload],
        error: null,
      };

    case GET_FIELDS_FAILURE:
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
