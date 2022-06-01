import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

import { MemoryRouter, Route, Routes } from "react-router-dom";
import {
  loginFormFields,
  loginInitialValue,
} from "constants/forms/loginFormsFields";
import { RoutesUrls } from "constants/routes";
import { loginValidationSchema } from "helpers/loginValidationSchema";
import { Form } from "../Form";

const { REGISTRATION } = RoutesUrls;

describe("component Form", () => {
  const handleClick = jest.fn();

  it("renders page login", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route
            path="/login"
            element={
              <Form
                title="Log In"
                titleLink="Don't have an account? Sign Up"
                link={REGISTRATION}
                buttonText="Sign In"
                initialValues={loginInitialValue}
                formFields={loginFormFields}
                onSubmit={() => handleClick()}
                validationSchema={loginValidationSchema}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );
    screen.debug();
    // expect(screen.toJSON()).toMatchSnapshot();
  });
});
