import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import { CssBaseline } from "@mui/material";

import {
  loginFormFields,
  loginInitialValue,
} from "constants/forms/loginFormsFields";
import {
  registrationFormFields,
  registrationInitialValue,
} from "constants/forms/registrationFormsFields";
import { RoutesUrls } from "constants/routes";

import store from "store/store";
import { loginAction, registrationAction } from "store/auth/actions";

import { Layout } from "components/Layout";
import { Board } from "components/Board/Board";
import { Form } from "components/common/Form";
import { AuthenticationLayout } from "components/AuthenticationLayout";

import { loginValidationSchema } from "helpers/login/loginValidationSchema";
import { registerValidationSchema } from "helpers/registration/registrationValidationSchema";
import { PrivateRoute } from "route/PrivateRoute";

const { MAIN, LOGIN, REGISTRATION, BOARD } = RoutesUrls;

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <CssBaseline />
      <Routes>
        <Route element={<AuthenticationLayout />}>
          <Route
            path={LOGIN}
            element={
              <Form
                title="Log In"
                titleLink="Don't have an account? Sign Up"
                link={REGISTRATION}
                buttonText="Sign In"
                initialValues={loginInitialValue}
                formFields={loginFormFields}
                onSubmit={loginAction}
                validationSchema={loginValidationSchema}
              />
            }
          />
          <Route
            path={REGISTRATION}
            element={
              <Form
                title="Registration"
                titleLink="Do have an account? Sign In"
                link={LOGIN}
                buttonText="Sign Up"
                initialValues={registrationInitialValue}
                formFields={registrationFormFields}
                onSubmit={registrationAction}
                validationSchema={registerValidationSchema}
              />
            }
          />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={MAIN} element={<Layout />}>
            <Route path={BOARD} element={<Board />} />
          </Route>
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);

export default App;
