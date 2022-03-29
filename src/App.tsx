import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Board } from "./components/Board";
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
import { Form } from "./components/common/Form";
import { loginAction, registrationAction } from "./store/auth/actions";
import { registerValidationSchema } from "./components/constants/RegistrationValidationSchema";
import { loginValidationSchema } from "./components/constants/loginValidationSchema";

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

store.subscribe(() => console.log(store.getState()));

export default App;
