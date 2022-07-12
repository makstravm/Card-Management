import React from "react";
import { render, screen } from "@testing-library/react";
import { FieldStateType } from "store/fields/types";
import userEvent from "@testing-library/user-event";
import { RootStore, StoreContext } from "store/index";
import { axiosInstance } from "api/index";
import { CardCreator } from "..";

const responseFieldList: { data: FieldStateType[] } = {
  data: [
    {
      name: "Name",
      type: "text",
      required: true,
      options: [],
      id: 1,
    },
  ],
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
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  })),
}));

jest.spyOn(axiosInstance, "get").mockResolvedValue(responseFieldList);

const root = new RootStore();

const { cards } = root;

describe("CardCreator component without props", () => {
  cards.cardsList = [];
  beforeEach(() => {
    render(
      <StoreContext.Provider value={root}>
        <CardCreator />
      </StoreContext.Provider>
    );
  });

  it("should be rendered", () => {
    expect(screen.getByTestId("form-cardcreate")).toBeInTheDocument();
  });

  it("should be save card", async () => {
    const responseCard = [
      {
        Name: "John",
        id: 1,
      },
    ];

    jest
      .spyOn(axiosInstance, "post")
      .mockResolvedValue({ data: { Name: "John", id: 1 } });

    await userEvent.type(
      screen.getByTestId(`input-${responseFieldList.data[0].name}`),
      "John"
    );

    await userEvent.click(screen.getByRole("button", { name: /Save/i }));
    expect(cards.cardsList).toEqual(responseCard);
  });
});

describe("CardCreator component with props", () => {
  const card = { Name: "John", id: 1 };

  const newCardResponse = [{ Name: "John Last", id: 1 }];

  beforeEach(() => {
    render(
      <StoreContext.Provider value={root}>
        <CardCreator card={card} />
      </StoreContext.Provider>
    );
  });

  it("should be rendered", () => {
    expect(screen.getByTestId("form-cardcreate")).toBeInTheDocument();
  });

  it("should be edit card", async () => {
    cards.cardsList = [card];
    jest
      .spyOn(axiosInstance, "put")
      .mockResolvedValue({ data: { Name: "John Last", id: 1 } });

    await userEvent.type(
      screen.getByTestId(`input-${responseFieldList.data[0].name}`),
      " Last"
    );

    await userEvent.click(screen.getByRole("button", { name: /Save/i }));

    expect(cards.cardsList).toEqual(newCardResponse);
  });
});
