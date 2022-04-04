import { v1 } from "uuid";

export const registrationFormFields = [
  {
    id: v1(),
    name: "name",
    type: "text",
    label: "Name",
  },
  {
    id: v1(),
    name: "lastName",
    type: "text",
    label: "Last Name",
  },
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
  {
    id: v1(),
    name: "confirmPassword",
    type: "password",
    label: "Confirm password",
  },
];

export const registrationInitialValue = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
