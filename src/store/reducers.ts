import { combineReducers } from "redux";
import { fieldsReducer } from "./fields/reducer";
import { modalReducer } from "./modals/reducer";

import { authReducer } from "./auth/reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  fields: fieldsReducer,
});
