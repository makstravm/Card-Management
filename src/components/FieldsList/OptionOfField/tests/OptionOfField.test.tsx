import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RootStore, StoreContext } from "store/index";
import { axiosInstance } from "api/index";
import { OptionOfField } from "..";

const field = {
  name: "Department",
  type: "select",
  required: true,
  options: [
    {
      id: "0.14752962428722038",
      value: "Python",
    },
    {
      id: "0.9236584516345452",
      value: "PM",
    },
    {
      id: "0.1969584207324151",
      value: "Ruby",
    },
  ],
  id: 3,
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
    put: jest.fn(),
  })),
}));

const root = new RootStore();

describe("OptionOfField", () => {
  beforeEach(() => {
    render(
      <StoreContext.Provider value={root}>
        <OptionOfField
          field={field}
          value={field.options[0].value}
          idOption={field.options[0].id}
        />
      </StoreContext.Provider>
    );
  });

  it("should be rendered", async () => {
    expect(screen.queryByText(field.options[0].value)).toBeInTheDocument();
  });

  it("should be called deleteFieldOptionAction", async () => {
    root.fields.fieldsList = [field];
    const mockDelFn = jest.spyOn(axiosInstance, "put");

    await userEvent.click(screen.getByTestId("deleteBtn"));
    await userEvent.click(screen.getByRole("button", { name: /yes/i }));
    expect(mockDelFn).toBeCalledTimes(1);
  });
});
