import React from "react";
import { render } from "react-dom";

import App from "./App";

import "react-toastify/dist/ReactToastify.css";
import "./style.scss";
import { RootStore, StoreContext } from "./store";

render(
  <StoreContext.Provider value={new RootStore()}>
    <App />
  </StoreContext.Provider>,
  document.getElementById("root")
);
