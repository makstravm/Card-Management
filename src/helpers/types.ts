export type RegisterValidationSchemaType = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginValidationSchemaType = {
  email: string;
  password: string;
};

export type FormFieldType = {
  id: string;
  name: string;
  type: string;
  label: string;
};

export type LoginInitialValueType = {
  email: string;
  password: string;
};

export type RegistrationInitialValueType = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LinksNavBarType = {
  id: string;
  title: string;
  link: string;
};
