import { combineReducers } from "redux";

import { fieldsReducer } from "./fields/reducer";
import { cardsReducer } from "./cards/reducer";

export const rootReducer = combineReducers({
  fields: fieldsReducer,
  cards: cardsReducer,
});
