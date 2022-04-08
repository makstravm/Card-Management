import { InitialState } from "store/types";
import {
  AuthActionTypes,
  AuthReducerActionsTypes,
  AuthUserType,
} from "./types";

const {
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_STARTED,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} = AuthActionTypes;

const initailState: InitialState<AuthUserType> = {
  data: null,
  loading: false,
  error: null,
};

export const authReducer = (
  state = initailState,
  action: AuthReducerActionsTypes
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
        data: { ...action.payload },
        error: null,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
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
        data: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
