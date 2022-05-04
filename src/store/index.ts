import { createContext } from "react";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Authentication } from "./auth";
import { Modal } from "./modals";

import { rootReducer } from "./reducers";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootStateType = ReturnType<typeof store.getState>;

export class RootStore {
  auth;

  modal;

  constructor() {
    this.auth = new Authentication(this);
    this.modal = new Modal(this);
  }
}

export const StoreContext = createContext<RootStore>(RootStore);

// const TimerView = observer(() => {
//   const timer = useContext(TimerContext); // See the Timer definition above.
//   return <span>Seconds passed: {timer.secondsPassed}</span>;
// });

// ReactDOM.render(
//   <TimerContext.Provider value={new Timer()}>
//     <TimerView />
//   </TimerContext.Provider>,
//   document.body
// );

export default store;
