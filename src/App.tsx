import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { observer } from "mobx-react-lite";

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

import { Board } from "components/Board";
import { Layout } from "components/Layout";
import { Form } from "components/common/Form";
import { AuthenticationLayout } from "components/AuthenticationLayout";

import { PrivateRoute } from "route/PrivateRoute";
import { registerValidationSchema } from "helpers/registrationValidationSchema";
import { loginValidationSchema } from "helpers/loginValidationSchema";
import store, { StoreContext } from "./store";

const { MAIN, LOGIN, REGISTRATION, BOARD } = RoutesUrls;

const App = observer(() => {
  const { auth } = useContext(StoreContext);

  return (
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
                  onSubmit={auth.loginAction}
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
                  onSubmit={auth.registrationAction}
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
});

export default App;
