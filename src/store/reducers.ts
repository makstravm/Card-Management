import { combineReducers } from "redux";

import { modalReducer } from "./modals/reducer";
import { fieldsReducer } from "./fields/reducer";
import { cardsReducer } from "./cards/reducer";

export const rootReducer = combineReducers({
  modal: modalReducer,
  fields: fieldsReducer,
  cards: cardsReducer,
});
