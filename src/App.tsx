import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

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

import { loginAction, registrationAction } from "store/auth/actions";

import { Board } from "components/Board";
import { Layout } from "components/Layout";
import { Form } from "components/common/Form";
import { AuthenticationLayout } from "components/AuthenticationLayout";
import { Preloader } from "components/Preloader";

import { PrivateRoute } from "route/PrivateRoute";
import { registerValidationSchema } from "helpers/registrationValidationSchema";
import { loginValidationSchema } from "helpers/loginValidationSchema";

import store, { persistor } from "./store";

const { MAIN, LOGIN, REGISTRATION, BOARD } = RoutesUrls;

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <CssBaseline />
      <PersistGate loading={<Preloader />} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

export default App;
