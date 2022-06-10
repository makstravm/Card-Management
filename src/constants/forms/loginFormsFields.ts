export const loginFormFields = [
  {
    id: String(Math.random()),
    name: "email",
    type: "text",
    label: "Email",
  },
  {
    id: String(Math.random()),
    name: "password",
    type: "password",
    label: "Password",
  },
];

export const loginInitialValue = {
  email: "",
  password: "",
};
