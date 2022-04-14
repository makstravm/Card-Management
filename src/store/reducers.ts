import { combineReducers } from "redux";

import { modalReducer } from "./modals/reducer";
import { fieldsReducer } from "./fields/reducer";
import { authReducer } from "./auth/reducer";
import { cardsReducer } from "./cards/reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  fields: fieldsReducer,
  cards: cardsReducer,
});
