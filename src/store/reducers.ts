import { combineReducers } from "redux";
import { modalReducer } from "./modals/reducer";

import { authReducer } from "./auth/reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
});
