import React from "react";
import { render, screen } from "@testing-library/react";
import { RootStore, StoreContext } from "store/index";
import { Preloader } from "..";

const root = new RootStore();

describe("Preloader", () => {
  it("should be rendered", () => {
    root.fields.loading = true;
    render(
      <StoreContext.Provider value={root}>
        <Preloader />
      </StoreContext.Provider>
    );
    expect(screen.getByTestId("preloader")).toBeInTheDocument();
  });

  it("shouldn't be rendered", () => {
    root.fields.loading = false;
    render(
      <StoreContext.Provider value={root}>
        <Preloader />
      </StoreContext.Provider>
    );
    expect(screen.queryByTestId("preloader")).not.toBeInTheDocument();
  });
});
