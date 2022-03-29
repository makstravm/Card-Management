import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Board } from "./components/Board";
import { Form } from "./components/common/Form";
import {
  loginFormFields,
  loginInitialValue,
} from "./components/constants/LoginFormsFields";
import {
  registrationFormFields,
  registrationInitialValue,
} from "./components/constants/RegistrationFormsFields";
import { Layout } from "./Layout";
import { Provider } from "react-redux";

import store from "./store";
const App = () => (
  <BrowserRouter>
    <Provider store={store}>
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
