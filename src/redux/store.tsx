import { createStore, combineReducers } from "redux";
import { authReducer } from "./AuthReducer";

const store = createStore(
  combineReducers({
    auth: authReducer,
  })
);

export type RootState = ReturnType<typeof store.getState>;

export default store;
