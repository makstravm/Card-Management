import React from "react";
import { render, screen } from "@testing-library/react";
import { FieldStateType } from "store/fields/types";
import userEvent from "@testing-library/user-event";
import { axiosInstance } from "api/index";
import { FieldCreator } from "..";

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
    post: jest.fn(),
    put: jest.fn(),
  })),
}));

describe("FieldCreator with  id in the field", () => {
  const fieldWithId: FieldStateType = {
    name: "Name",
    type: "text",
    required: true,
    options: [],
    id: 1,
  };

  beforeEach(() => {
    render(<FieldCreator type="text" field={fieldWithId} />);
  });

  it("should be rendered", () => {
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it("should edit field", async () => {
    const response: FieldStateType = {
      name: "Name",
      type: "text",
      required: false,
      options: [],
      id: 1,
    };

    const mockResponse = jest.spyOn(axiosInstance, "put");

    await userEvent.click(screen.getByRole("checkbox", { name: /required/i }));
    await userEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(mockResponse).toBeCalledWith(`/fields/${response.id}`, response);
  });
});

describe("FieldCreator without  id in the field", () => {
  const fieldWithoutId: FieldStateType = {
    name: "Name",
    type: "text",
    required: true,
    options: [],
  };

  beforeEach(() => {
    render(<FieldCreator type="text" field={fieldWithoutId} />);
  });

  it("should save field", async () => {
    const response: FieldStateType = {
      name: "Name",
      type: "text",
      required: false,
      options: [],
    };

    const mockResponse = jest.spyOn(axiosInstance, "post");

    await userEvent.click(screen.getByRole("checkbox", { name: /required/i }));
    await userEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(mockResponse).toBeCalledWith("/fields", response);
  });
});
