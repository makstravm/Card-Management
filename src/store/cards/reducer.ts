import {
  CarddsReducerActionsTypes,
  CardsActionTypes,
  InitialStateCardsListType,
} from "./types";

const {
  CARDS_ACTION_STARTED,
  CARDS_ACTION_FAILURE,
  SET_CARD_SUCCESS,
  GET_CARDS_SUCCESS,
} = CardsActionTypes;

const initailState: InitialStateCardsListType = {
  cardsList: [],
  loading: false,
  error: null,
};

export const fieldsReducer = (
  state = initailState,
  action: CarddsReducerActionsTypes
) => {
  switch (action.type) {
    case CARDS_ACTION_STARTED:
      return {
        ...state,
        loading: true,
      };

    case CARDS_ACTION_FAILURE:
      return {
        ...state,
        loading: false,
        cardsList: null,
        error: action.payload,
      };

    case SET_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        cardsList: [action.payload],
        error: null,
      };

    case GET_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        cardsList: [...action.payload],
        error: null,
      };

    default:
      return state;
  }
};
