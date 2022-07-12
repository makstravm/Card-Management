import React from "react";
import { render, screen } from "@testing-library/react";
import { Formik } from "formik";
import userEvent from "@testing-library/user-event";

import { switchedFieldCreateValidation } from "../../../../helpers/optionsValidSchema";
import { SelectOptions } from "..";

const initialValue = {
  options: [
    {
      id: "1",
      value: "",
    },
    {
      id: "2",
      value: "",
    },
  ],
};

describe("SelectOptions component without props", () => {
  beforeEach(() => {
    render(
      <Formik
        initialValues={initialValue}
        onSubmit={() => {}}
        validationSchema={switchedFieldCreateValidation("select")}
      >
        {(props) => <SelectOptions options="options" formik={props} />}
      </Formik>
    );
  });

  it("should been added new option", async () => {
    expect(
      screen.getAllByRole("textbox", { name: /name option/i }).length
    ).toBe(2);
    await userEvent.click(screen.getByRole("button", { name: /add/i }));
    expect(
      screen.getAllByRole("textbox", { name: /name option/i }).length
    ).toBe(3);
  });

  it("should been deleted new option", async () => {
    expect(
      screen.getAllByRole("textbox", { name: /name option/i }).length
    ).toBe(2);
    await userEvent.click(screen.getByRole("button", { name: /add/i }));
    await userEvent.click(screen.getByTestId("btn-delete-0"));
    expect(
      screen.getAllByRole("textbox", { name: /name option/i }).length
    ).toBe(2);
  });
  it("should been move down option", async () => {
    await userEvent.type(screen.getByTestId("input-option-0"), "John");
    await userEvent.click(screen.getByTestId("move-down-0"));
    const input = screen.getByTestId("input-option-1") as HTMLInputElement;

    expect(input.value).toBe("John");
  });
  it("should been move up option", async () => {
    await userEvent.type(screen.getByTestId("input-option-1"), "John");
    await userEvent.click(screen.getByTestId("move-up-1"));
    const input = screen.getByTestId("input-option-0") as HTMLInputElement;

    expect(input.value).toBe("John");
  });
  it("should been checked dublicate values", async () => {
    await userEvent.type(screen.getByTestId("input-option-0"), "John");
    expect(screen.queryAllByText(/duplicate/i)[0]).toBeFalsy();
    await userEvent.type(screen.getByTestId("input-option-1"), "John");

    expect(screen.queryAllByText(/duplicate/i)[0]).toBeTruthy();
  });
});
