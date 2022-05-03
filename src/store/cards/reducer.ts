import {
  CardsReducerActionsTypes,
  CardsActionTypes,
  InitialStateCardsListType,
} from "./types";

const {
  CARDS_ACTION_STARTED,
  CARDS_ACTION_FAILURE,
  SET_CARD_SUCCESS,
  GET_CARDS_SUCCESS,
  UPDATE_FIELDS_CARD,
  UPDATE_CARD_SUCCESS,
  DELETE_CARD_SUCCESS,
} = CardsActionTypes;

const initailState: InitialStateCardsListType = {
  cardsList: [],
  loading: false,
  error: null,
};

export const cardsReducer = (
  state = initailState,
  action: CardsReducerActionsTypes
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
        error: action.payload,
      };

    case SET_CARD_SUCCESS:
      return {
        ...state,
        cardsList: [...state.cardsList, action.payload],
        loading: false,
      };

    case GET_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        cardsList: [...action.payload],
        error: null,
      };

    case UPDATE_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        cardsList: state.cardsList.map((card) =>
          card.id === action.payload.id ? action.payload : card
        ),
        error: null,
      };

    case UPDATE_FIELDS_CARD:
      return {
        ...state,
        loading: false,
        cardsList: [...action.payload],
        error: null,
      };

    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        cardsList: state.cardsList.filter((card) => card.id !== action.payload),
        error: null,
      };

    default:
      return state;
  }
};
