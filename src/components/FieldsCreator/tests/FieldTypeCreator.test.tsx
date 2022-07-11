import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axiosInstance } from "api/index";
import { FieldTypeCreator } from "../FieldTypeCreator";

const responseFieldList = [
  {
    id: 1,
    value: "text",
  },
  {
    id: 2,
    value: "checkbox",
  },
  {
    id: 3,
    value: "select",
  },
];

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

jest.spyOn(axiosInstance, "get").mockResolvedValue({ data: responseFieldList });

describe("FieldTypeCreator", () => {
  beforeEach(() => {
    render(<FieldTypeCreator />);
  });

  it("should be rendered", async () => {
    await userEvent.click(screen.getByRole("button", { name: /text/i }));
    await userEvent.click(screen.getByRole("option", { name: /select/i }));
    expect(screen.getByRole("button", { name: /select/i })).toBeInTheDocument();
  });
});
