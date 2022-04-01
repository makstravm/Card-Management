import { v1 } from "uuid";

export const loginFormFields = [
  {
    id: v1(),
    name: "email",
    type: "text",
    label: "Email",
  },
  {
    id: v1(),
    name: "password",
    type: "password",
    label: "Password",
  },
];

export const loginInitialValue = {
  email: "",
  password: "",
};
