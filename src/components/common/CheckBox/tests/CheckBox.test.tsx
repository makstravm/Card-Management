import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckBox } from "../CheckBox";

const handleClickMock = jest.fn();

describe("CheckBox", () => {
  beforeEach(() => {
    render(<CheckBox name="Car" checked handleChange={handleClickMock} />);
  });

  it("should be rendered", () => {
    expect(screen.getByTestId("checkbox")).toBeInTheDocument();
  });

  it("should be called fn", async () => {
    await userEvent.click(screen.getByRole("checkbox", { name: /car/i }));
    expect(handleClickMock).toBeCalledTimes(1);
  });
});
