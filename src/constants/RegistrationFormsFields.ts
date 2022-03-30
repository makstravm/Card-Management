export const registrationFormFields = [
  {
    id: `name-${new Date().getTime()}`,
    name: "name",
    type: "text",
    label: "Name",
  },
  {
    id: `lastName-${new Date().getTime()}`,
    name: "lastName",
    type: "text",
    label: "Last Name",
  },
  {
    id: `email-${new Date().getTime()}`,
    name: "email",
    type: "text",
    label: "Email",
  },
  {
    id: `password-${new Date().getTime()}`,
    name: "password",
    type: "password",
    label: "Password",
  },
  {
    id: `confirmPassword-${new Date().getTime()}`,
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
