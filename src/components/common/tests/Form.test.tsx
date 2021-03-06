import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MemoryRouter, Route, Routes } from "react-router-dom";
import {
  loginFormFields,
  loginInitialValue,
} from "constants/forms/loginFormsFields";
import { RoutesUrls } from "constants/routes";
import { loginValidationSchema } from "helpers/loginValidationSchema";

import { FormComponent } from "../FormComponent";

const { REGISTRATION, LOGIN } = RoutesUrls;

const handleSubmit = jest.fn();

describe("component Form, page login", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={[LOGIN]}>
        <Routes>
          <Route
            path={LOGIN}
            element={
              <FormComponent
                title="Log In"
                titleLink="Don't have an account? Sign Up"
                link={REGISTRATION}
                buttonText="Sign In"
                initialValues={loginInitialValue}
                formFields={loginFormFields}
                onSubmit={handleSubmit}
                validationSchema={loginValidationSchema}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );
  });

  it("should render login page", () => {
    expect(
      screen.getByRole("heading", { name: /log in/i })
    ).toBeInTheDocument();
  });

  it("should be a button disabled when the form is empty", async () => {
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    expect(screen.getByRole("button", { name: /sign in/i })).toBeDisabled();
  });

  it("should to submit form when value is valid", async () => {
    await userEvent.type(screen.getByTestId("input-email"), "user@email.com");

    expect(screen.getByTestId("input-email")).toHaveValue("user@email.com");

    await userEvent.type(screen.getByTestId("input-password"), "1q2w3e4r5t");

    expect(screen.getByTestId("input-password")).not.toHaveValue("123");

    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          email: "user@email.com",
          password: "1q2w3e4r5t",
        },
        expect.any(Function)
      );
    });
  });
});
