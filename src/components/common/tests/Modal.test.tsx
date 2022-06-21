import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RootStore, StoreContext } from "store/index";
import { Modal } from "../Modal";

const { showModalAction } = new RootStore().modal;

describe("component Modal", () => {
  it("should be render component Modal", async () => {
    render(
      <StoreContext.Provider value={new RootStore()}>
        <button
          data-testid="btn"
          type="button"
          onClick={() => showModalAction("test", <div>Content</div>)}
        >
          btn
        </button>
        <Modal />
      </StoreContext.Provider>
    );

    await userEvent.click(screen.getByTestId("btn"));
  });
});
