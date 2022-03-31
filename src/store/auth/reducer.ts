import {
  ActionTypes,
  AuthReducerActionsTypes,
  InitialStateAuthType,
} from "./types";

const initialState: InitialStateAuthType = {
  user: null,
  error: null,
  loading: false,
};

const {
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_STARTED,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} = ActionTypes;

export const authReducer = (
  state = initialState,
  action?: AuthReducerActionsTypes
) => {
  switch (action.type) {
    case LOGIN_STARTED:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: { ...action.payload },
        error: null,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };

    case REGISTER_STARTED:
      return {
        ...state,
        loading: true,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
