import React from "react";
import { render, screen } from "@testing-library/react";
import { Board } from "..";

describe("Board component", () => {
  beforeEach(() => {});

  it("should be rendered Board component", () => {
    render(<Board />);

    expect(screen.queryByTestId("board-container")).toBeInTheDocument();
  });
});
