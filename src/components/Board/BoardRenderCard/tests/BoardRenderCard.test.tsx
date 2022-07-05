import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RootStore, StoreContext } from "store/index";

import { axiosInstance } from "api/index";
import { BoardRenderCard } from "../index";

const responseFieldList = {
  data: [
    {
      name: "Position",
      type: "text",
      required: true,
      options: [],
      id: 2,
    },
    {
      name: "Department",
      type: "select",
      required: false,
      options: [
        {
          id: "0.5372611094649213",
          value: ".NET",
        },
        {
          id: "0.5692681653767555",
          value: " C++",
        },
      ],
      id: 3,
    },
    {
      name: "Car",
      type: "checkbox",
      required: false,
      options: [],
      id: 4,
    },
  ],
};

const responseCardList = {
  data: [
    {
      Name: "Bob",
      Position: "dqe",
      Department: ".NET",
      Car: false,
      id: 1,
    },
    {
      Name: "Jane",
      Position: "Programmer",
      Department: "SEO",
      Car: false,
      id: 2,
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
  })),
}));

const root = new RootStore();

jest.spyOn(axiosInstance, "get").mockResolvedValueOnce(responseCardList);
jest.spyOn(axiosInstance, "get").mockResolvedValueOnce(responseFieldList);
describe("GroupCardsBtn component", () => {
  beforeEach(() => {
    render(
      <StoreContext.Provider value={root}>
        <BoardRenderCard />
      </StoreContext.Provider>
    );
  });

  it("should be rendered icons when title is  'true' or 'false'", async () => {
    await userEvent.click(
      screen.getByRole("button", { name: responseFieldList.data[2].name })
    );
    expect(screen.queryByTestId("groupcard-title__true")).toBeInTheDocument();
    expect(screen.queryByTestId("groupcard-title__false")).toBeInTheDocument();
  });
});
