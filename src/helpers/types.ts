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
