import React from "react";
import { render, screen } from "@testing-library/react";
import { RootStore, StoreContext } from "store/index";
import App from "../App";

describe("App component Log In page", () => {
  const root = new RootStore();

  beforeEach(() => {
    render(
      <StoreContext.Provider value={root}>
        <App />
      </StoreContext.Provider>
    );
  });

  it("should be render ", () => {
    expect(screen.queryByText(/log in/i)).toBeInTheDocument();
  });
});
