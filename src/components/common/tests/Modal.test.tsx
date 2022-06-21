import React, { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RootStore, StoreContext } from "store/index";
import { Modal } from "../Modal";

const root = new RootStore();

const {
  modal: { showModalAction },
} = root;

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");

  return {
    ...original,
    createPortal: (node: ReactNode) => node,
  };
});

describe("component Modal", () => {
  beforeEach(() => {
    render(
      <StoreContext.Provider value={root}>
        <button
          data-testid="btn"
          type="button"
          onClick={() => showModalAction("Test Title", <div>Content</div>)}
        >
          btn
        </button>
        <Modal />
      </StoreContext.Provider>
    );
  });

  it("shouldn't be render component Modal", () => {
    expect(screen.queryByText(/test title/i)).not.toBeInTheDocument();
  });

  it("should be render component Modal", async () => {
    await userEvent.click(screen.getByTestId("btn"));
    expect(
      screen.getByRole("heading", { name: /test title/i })
    ).toBeInTheDocument();
  });
});
