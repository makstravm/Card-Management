export const loginFormFields = [
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
];

export type LoginInitialValueType = {
  email: string;
  password: string;
};

export const loginInitialValue = {
  email: "",
  password: "",
};
