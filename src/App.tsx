import { Provider } from "react-redux";
import React from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Board } from "./components/Board";
import {
  loginFormFields,
  loginInitialValue,
} from "./constants/loginFormsFields";
import {
  registrationFormFields,
  registrationInitialValue,
} from "./constants/registrationFormsFields";
import { Layout } from "./components/Layout";
import store from "./store";
import { Form } from "./components/common/Form";
import { loginAction, registrationAction } from "./store/auth/actions";
import { loginValidationSchema } from "./helpers/loginValidationSchema";
import { registerValidationSchema } from "./helpers/registrationValidationSchema";

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/login"
            element={
              <Form
                title="Log In"
                buttonText="Sign In"
                initialValues={loginInitialValue}
                formFields={loginFormFields}
                onSubmit={loginAction}
                validationSchema={loginValidationSchema}
              />
            }
          />
          <Route
            path="/registration"
            element={
              <Form
                title="Registration"
                buttonText="Sign Up"
                initialValues={registrationInitialValue}
                formFields={registrationFormFields}
                onSubmit={registrationAction}
                validationSchema={registerValidationSchema}
              />
            }
          />
          <Route path="/board" element={<Board />} />
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);

export default App;
