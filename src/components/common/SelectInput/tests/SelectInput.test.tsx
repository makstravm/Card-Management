import React from "react";
import { render, screen } from "@testing-library/react";
import { SelectInput } from "../SelectInput";

const options = [
  {
    id: "0.7056778685517964",
    value: " Java",
  },
  {
    id: "0.770981923282319",
    value: "JS/UI",
  },
  { id: "0.5435855377937708", value: "PHP" },
];

const handleClickMock = jest.fn();

describe("CheckBox with value", () => {
  beforeEach(() => {
    render(
      <SelectInput
        name="Department"
        options={options}
        value={{ Department: "" }}
        handleChange={handleClickMock}
      />
    );
  });

  it("should be rendered", () => {
    expect(screen.getByTestId("selectInput")).toBeInTheDocument();
  });
});

describe("CheckBox without value", () => {
  beforeEach(() => {
    render(
      <SelectInput
        name="Department"
        options={options}
        value={{ Department: "JS/UI" }}
        handleChange={handleClickMock}
      />
    );
  });

  it("should be rendered", () => {
    expect(screen.getByTestId("selectInput")).toBeInTheDocument();
  });
});
