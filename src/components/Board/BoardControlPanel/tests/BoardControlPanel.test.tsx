import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RootStore, StoreContext } from "store/index";
import { BoardControlPanel } from "..";

describe("BoardControlPanel component", () => {
  const root = new RootStore();

  const { modal } = root;

  beforeEach(() => {
    render(
      <StoreContext.Provider value={root}>
        <BoardControlPanel />
      </StoreContext.Provider>
    );
  });
  it("should be render component", () => {
    expect(screen.getByTestId("BoardControlPanel")).toBeInTheDocument();
  });

  it("should  be changed modal store on click button 'create field'", async () => {
    await userEvent.click(screen.getByRole("button", { name: /Add Field/i }));
    expect(modal.title).toBe("Create Field");
    expect(modal.showModal).toBeTruthy();
  });

  it("should  be changed modal store on click button 'Create Card'", async () => {
    await userEvent.click(screen.getByRole("button", { name: /Create Card/i }));
    expect(modal.title).toBe("Create Card");
    expect(modal.showModal).toBeTruthy();
  });

  it("should  be changed modal store on click button 'Show all fields'", async () => {
    await userEvent.click(
      screen.getByRole("button", { name: /Show all fields/i })
    );
    expect(modal.title).toBe("All Fields");
    expect(modal.showModal).toBeTruthy();
  });
});
