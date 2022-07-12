import React, { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { RootStore, StoreContext } from "store/index";
import App from "../App";

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");

  return {
    ...original,
    createPortal: (node: ReactNode) => node,
  };
});

jest.mock("js-cookie", () => ({
  get: () =>
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJvYkBiLmIiLCJpYXQiOjE2NTc2Mzk1MjIsImV4cCI6MTY1NzY0MzEyMiwic3ViIjoiNyJ9.AWE5RHZQVTXrCJjZc3wbZ8WiP025kvsVoqiPRoy5LUU",
}));

describe("App component Main page", () => {
  const root = new RootStore();

  it("should be render Main Page", () => {
    render(
      <StoreContext.Provider value={root}>
        <App />
      </StoreContext.Provider>
    );

    expect(screen.queryByText(/board/i)).toBeInTheDocument();
  });
});
