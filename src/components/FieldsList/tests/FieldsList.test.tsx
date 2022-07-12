import React from "react";
import { render, screen } from "@testing-library/react";
import { RootStore, StoreContext } from "store/index";
import { axiosInstance } from "api/index";
import { FieldsList } from "..";

const responseFieldList = {
  data: [
    {
      name: "Name",
      type: "text",
      required: true,
      options: [],
      id: 1,
    },
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
        {
          id: "0.531641706890057",
          value: " Admins",
        },
        {
          id: "0.619566694289958",
          value: " Android",
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

jest.spyOn(axiosInstance, "get").mockResolvedValue(responseFieldList);

describe("FieldsList component without props", () => {
  beforeEach(() => {
    render(
      <StoreContext.Provider value={root}>
        <FieldsList />
      </StoreContext.Provider>
    );
  });

  it("should be rendered", async () => {
    expect(screen.queryByTestId("field-list")).toBeInTheDocument();
    expect(screen.queryByText("Car")).toBeInTheDocument();
  });
});
