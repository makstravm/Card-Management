import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RootStore, StoreContext } from "store/index";
import { axiosInstance } from "api/index";
import { CardActions } from "..";

const card = {
  Name: "Bob",
  Position: "dqe",
  Department: " C++",
  Car: false,
  id: 1,
};

jest.mock("axios", () => ({
  create: jest.fn(() => ({
    interceptors: {
      request: {
        use: jest.fn(),
        eject: jest.fn(),
      },
      response: {
        use: jest.fn(),
        eject: jest.fn(),
      },
    },
    delete: jest.fn(),
  })),
}));

describe("BoardControlPanel component", () => {
  const root = new RootStore();

  const { cards, modal } = root;

  cards.cardsList.push(card);

  beforeEach(() => {
    render(
      <StoreContext.Provider value={root}>
        <CardActions card={card} />
      </StoreContext.Provider>
    );
  });

  it("should be rendered", () => {
    expect(screen.getByTestId("card-actions--box")).toBeInTheDocument();
  });

  it("should be shown shadow buttons", async () => {
    await userEvent.click(screen.getByTestId("button-more"));
    expect(screen.getByTestId("button-edit")).toBeInTheDocument();
  });

  it("should be shown shadow buttons", async () => {
    expect(screen.queryByTestId("button-edit")).not.toBeInTheDocument();
    await userEvent.click(screen.getByTestId("button-more"));
    expect(screen.getByTestId("button-edit")).toBeInTheDocument();
  });

  it("should be shown confirm dialog", async () => {
    await userEvent.click(screen.getByTestId("button-more"));
    await userEvent.click(screen.getByTestId("button-delete"));
    expect(screen.getByText(/want to remove/i));
  });

  it("should be delete card", async () => {
    jest.spyOn(axiosInstance, "delete");
    await userEvent.click(screen.getByTestId("button-more"));
    await userEvent.click(screen.getByTestId("button-delete"));
    expect(cards.cardsList.length).toBe(1);
    await userEvent.click(screen.getByRole("button", { name: /yes/i }));
    expect(cards.cardsList.length).toBe(0);
  });

  it("should be open modal edit", async () => {
    jest.spyOn(axiosInstance, "delete");
    await userEvent.click(screen.getByTestId("button-more"));
    await userEvent.click(screen.getByTestId("button-edit"));
    expect(modal.showModal).toBeTruthy();
    expect(modal.title).toEqual("Edit Card");
  });
});
